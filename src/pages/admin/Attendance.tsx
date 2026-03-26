import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Skeleton, Grid
} from '@mui/material'
import {
  CheckCircle, Cancel, AccessTime, EventAvailable
} from '@mui/icons-material'
import { useGetAttendanceQuery } from '../../services/api'
import type { AttendanceRecord } from '../../services/api'

function AttendanceChip({ status }: { status: AttendanceRecord['status'] }) {
  const map = {
    present: { label: 'Présent', color: 'success' as const, icon: <CheckCircle fontSize="inherit" /> },
    absent: { label: 'Absent', color: 'error' as const, icon: <Cancel fontSize="inherit" /> },
    late: { label: 'Retard', color: 'warning' as const, icon: <AccessTime fontSize="inherit" /> },
    excused: { label: 'Excuse', color: 'info' as const, icon: <EventAvailable fontSize="inherit" /> },
  }
  const s = map[status]
  return <Chip label={s.label} size="small" color={s.color} icon={s.icon} sx={{ fontWeight: 600 }} />
}

export default function AdminAttendance() {
  const { data: attendance, isLoading } = useGetAttendanceQuery()

  const present = attendance?.filter(a => a.status === 'present').length ?? 0
  const absent = attendance?.filter(a => a.status === 'absent').length ?? 0
  const late = attendance?.filter(a => a.status === 'late').length ?? 0
  const excused = attendance?.filter(a => a.status === 'excused').length ?? 0

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Présences</Typography>
        <Typography variant="body2" color="text.secondary">
          Suivi des présences — {new Date().toLocaleDateString('fr-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Présents', count: present, color: '#E8F5E9', textColor: '#2E7D32' },
          { label: 'Absents', count: absent, color: '#FFEBEE', textColor: '#C62828' },
          { label: 'Retards', count: late, color: '#FFF3E0', textColor: '#E65100' },
          { label: 'Excusés', count: excused, color: '#E3F2FD', textColor: '#1565C0' },
        ].map(s => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Card sx={{ bgcolor: s.color, border: 'none' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: s.textColor }}>{s.count}</Typography>
                <Typography variant="caption" sx={{ color: s.textColor }}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(6)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Élève</TableCell>
                    <TableCell>Classe</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Motif</TableCell>
                    <TableCell>Formateur</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(attendance ?? []).map(record => (
                    <TableRow key={record.id} hover>
                      <TableCell>
                        <Typography fontWeight={500} variant="body2">{record.studentName}</Typography>
                      </TableCell>
                      <TableCell><Chip label={record.className} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString('fr-DZ')}</TableCell>
                      <TableCell><AttendanceChip status={record.status} /></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{record.reason ?? '–'}</Typography></TableCell>
                      <TableCell><Typography variant="caption">{record.teacherId}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
