import {
  Box, Typography, Card, CardContent, Grid, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Skeleton
} from '@mui/material'
import { CheckCircle, Cancel, AccessTime, EventAvailable } from '@mui/icons-material'
import { useGetAttendanceQuery } from '../../services/api'
import type { AttendanceRecord } from '../../services/api'

function AttendanceChip({ status }: { status: AttendanceRecord['status'] }) {
  const map = {
    present: { label: 'Présent', color: 'success' as const },
    absent: { label: 'Absent', color: 'error' as const },
    late: { label: 'Retard', color: 'warning' as const },
    excused: { label: 'Excusé', color: 'info' as const },
  }
  const s = map[status]
  return <Chip label={s.label} size="small" color={s.color} sx={{ fontWeight: 600 }} />
}

export default function ParentAttendance() {
  const { data: attendance, isLoading } = useGetAttendanceQuery()
  const childAttendance = attendance?.filter(a => a.studentId === 's1') ?? []

  const counts = {
    present: childAttendance.filter(a => a.status === 'present').length,
    absent: childAttendance.filter(a => a.status === 'absent').length,
    late: childAttendance.filter(a => a.status === 'late').length,
    excused: childAttendance.filter(a => a.status === 'excused').length,
  }
  const rate = childAttendance.length ? ((counts.present / childAttendance.length) * 100).toFixed(0) : '—'

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Présences de mon enfant</Typography>
        <Typography variant="body2" color="text.secondary">
          Amina Benali • 3ème A • Taux de présence: <strong>{rate}%</strong>
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Présents', count: counts.present, color: '#E8F5E9', textColor: '#2E7D32' },
          { label: 'Absents', count: counts.absent, color: '#FFEBEE', textColor: '#C62828' },
          { label: 'Retards', count: counts.late, color: '#FFF3E0', textColor: '#E65100' },
          { label: 'Excusés', count: counts.excused, color: '#E3F2FD', textColor: '#1565C0' },
        ].map(s => (
          <Grid item xs={3} key={s.label}>
            <Card sx={{ bgcolor: s.color }}>
              <CardContent sx={{ p: 2, textAlign: 'center', '&:last-child': { pb: 2 } }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: s.textColor }}>{s.count}</Typography>
                <Typography variant="caption" sx={{ color: s.textColor }}>{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(4)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Motif</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {childAttendance.map(record => (
                    <TableRow key={record.id} hover>
                      <TableCell>{new Date(record.date).toLocaleDateString('fr-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                      <TableCell><AttendanceChip status={record.status} /></TableCell>
                      <TableCell><Typography variant="caption" color="text.secondary">{record.reason ?? '–'}</Typography></TableCell>
                    </TableRow>
                  ))}
                  {childAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} sx={{ textAlign: 'center', color: 'text.secondary' }}>Aucun enregistrement</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
