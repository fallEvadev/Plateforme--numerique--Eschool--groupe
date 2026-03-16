import {
  Box, Typography, Card, CardContent, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Tooltip, Skeleton, Grid
} from '@mui/material'
import { Add, Edit, Delete, Timer } from '@mui/icons-material'
import { useGetExamsQuery } from '../../services/api'
import type { Exam } from '../../services/api'

function ExamStatusChip({ status }: { status: Exam['status'] }) {
  const map = {
    scheduled: { label: 'Planifié', color: 'info' as const },
    ongoing: { label: 'En cours', color: 'warning' as const },
    completed: { label: 'Terminé', color: 'success' as const },
  }
  const s = map[status]
  return <Chip label={s.label} size="small" color={s.color} variant="outlined" sx={{ fontWeight: 600 }} />
}

function ExamTypeChip({ type }: { type: Exam['type'] }) {
  const map = {
    controle: { label: 'Contrôle', color: '#E3F2FD' },
    composition: { label: 'Composition', color: '#EDE7F6' },
    rattrapage: { label: 'Rattrapage', color: '#FFF3E0' },
  }
  const s = map[type]
  return <Chip label={s.label} size="small" sx={{ bgcolor: s.color, fontWeight: 600 }} />
}

export default function AdminExams() {
  const { data: exams, isLoading } = useGetExamsQuery()

  const scheduled = exams?.filter(e => e.status === 'scheduled').length ?? 0
  const completed = exams?.filter(e => e.status === 'completed').length ?? 0

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Gestion des examens</Typography>
          <Typography variant="body2" color="text.secondary">Planifiez et suivez les épreuves</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Nouvel examen</Button>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: '#EBF3FF', border: '1px solid #BBDEFB' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="primary">{exams?.length ?? 0}</Typography>
              <Typography variant="caption" color="text.secondary">Total examens</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: '#E3F2FD', border: '1px solid #BBDEFB' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="info.dark">{scheduled}</Typography>
              <Typography variant="caption" color="text.secondary">Planifiés</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: '#E8F5E9', border: '1px solid #C8E6C9' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="success.dark">{completed}</Typography>
              <Typography variant="caption" color="text.secondary">Terminés</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card sx={{ background: '#FFF3E0', border: '1px solid #FFE0B2' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight={700} color="warning.dark">
                {exams?.filter(e => e.type === 'composition').length ?? 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">Compositions</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(5)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Matière</TableCell>
                    <TableCell>Classe</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Heure</TableCell>
                    <TableCell>Durée</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(exams ?? []).map(exam => (
                    <TableRow key={exam.id} hover>
                      <TableCell><Typography fontWeight={500} variant="body2">{exam.title}</Typography></TableCell>
                      <TableCell>{exam.subject}</TableCell>
                      <TableCell><Chip label={exam.className} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell>{new Date(exam.date).toLocaleDateString('fr-DZ')}</TableCell>
                      <TableCell>{exam.startTime}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Timer fontSize="small" sx={{ color: 'grey.400', fontSize: 14 }} />
                          <Typography variant="body2">{exam.duration} min</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><ExamTypeChip type={exam.type} /></TableCell>
                      <TableCell><ExamStatusChip status={exam.status} /></TableCell>
                      <TableCell align="right">
                        <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                      </TableCell>
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
