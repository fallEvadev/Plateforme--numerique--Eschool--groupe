import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button, Select,
  MenuItem, FormControl, InputLabel, Grid
} from '@mui/material'
import { useState } from 'react'
import { CheckCircle, Cancel, AccessTime, EventAvailable, Save } from '@mui/icons-material'
import { useGetStudentsQuery } from '../../services/api'

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused'

const statusOptions: { value: AttendanceStatus; label: string; color: 'success' | 'error' | 'warning' | 'info' }[] = [
  { value: 'present', label: 'Présent', color: 'success' },
  { value: 'absent', label: 'Absent', color: 'error' },
  { value: 'late', label: 'Retard', color: 'warning' },
  { value: 'excused', label: 'Excusé', color: 'info' },
]

export default function TeacherAttendance() {
  const { data: students } = useGetStudentsQuery()
  const myStudents = students?.filter(s => s.className === '3ème A') ?? []

  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() =>
    Object.fromEntries(myStudents.map(s => [s.id, 'present' as AttendanceStatus]))
  )

  const counts = {
    present: Object.values(attendance).filter(v => v === 'present').length,
    absent: Object.values(attendance).filter(v => v === 'absent').length,
    late: Object.values(attendance).filter(v => v === 'late').length,
    excused: Object.values(attendance).filter(v => v === 'excused').length,
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Feuille de présences</Typography>
          <Typography variant="body2" color="text.secondary">
            Classe: 3ème A • {new Date().toLocaleDateString('fr-DZ', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />}>Enregistrer</Button>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Présents', count: counts.present, color: '#E8F5E9', textColor: '#2E7D32' },
          { label: 'Absents', count: counts.absent, color: '#FFEBEE', textColor: '#C62828' },
          { label: 'Retards', count: counts.late, color: '#FFF3E0', textColor: '#E65100' },
          { label: 'Excusés', count: counts.excused, color: '#E3F2FD', textColor: '#1565C0' },
        ].map(s => (
          <Grid item xs={3} key={s.label}>
            <Card sx={{ bgcolor: s.color }}>
              <CardContent sx={{ p: 1.5, textAlign: 'center', '&:last-child': { pb: 1.5 } }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: s.textColor }}>{s.count}</Typography>
                <Typography variant="caption" sx={{ color: s.textColor }}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Élève</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell width={180}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myStudents.map((s, i) => (
                  <TableRow key={s.id} hover sx={{ bgcolor: attendance[s.id] === 'absent' ? '#FFF8F8' : attendance[s.id] === 'present' ? '#F8FFF8' : 'inherit' }}>
                    <TableCell sx={{ color: 'text.secondary', width: 40 }}>{i + 1}</TableCell>
                    <TableCell>
                      <Typography fontWeight={500} variant="body2">{s.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={s.gender === 'M' ? 'G' : 'F'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <FormControl size="small" fullWidth>
                        <Select
                          value={attendance[s.id] ?? 'present'}
                          onChange={e => setAttendance(prev => ({ ...prev, [s.id]: e.target.value as AttendanceStatus }))}
                        >
                          {statusOptions.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>
                              <Chip label={opt.label} size="small" color={opt.color} sx={{ fontWeight: 600, width: '100%' }} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}
