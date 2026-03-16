import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button, LinearProgress,
  IconButton, Tooltip
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useGetAssignmentsQuery } from '../../services/api'

export default function TeacherAssignments() {
  const { data: assignments } = useGetAssignmentsQuery()
  const myAssignments = assignments?.filter(a => a.teacherId === 't1') ?? []

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Devoirs & travaux</Typography>
          <Typography variant="body2" color="text.secondary">{myAssignments.length} devoir(s) créé(s)</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Nouveau devoir</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {myAssignments.map(a => {
          const submissionRate = (a.submissions / a.totalStudents) * 100
          const isOverdue = new Date(a.dueDate) < new Date()
          return (
            <Card key={a.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>{a.title}</Typography>
                      <Chip label={a.subject} size="small" color="primary" variant="outlined" />
                      <Chip label={a.className} size="small" variant="outlined" />
                      {isOverdue && <Chip label="Expiré" size="small" color="error" />}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{a.description}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Rendu avant: <strong>{new Date(a.dueDate).toLocaleDateString('fr-DZ')}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Remis: <strong>{a.submissions}/{a.totalStudents}</strong>
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={submissionRate}
                        sx={{ flex: 1, height: 6, borderRadius: 3 }}
                        color={submissionRate >= 80 ? 'success' : submissionRate >= 50 ? 'warning' : 'error'}
                      />
                      <Typography variant="caption" fontWeight={700}>{submissionRate.toFixed(0)}%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                    <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}
