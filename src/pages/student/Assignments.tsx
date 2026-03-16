import {
  Box, Typography, Card, CardContent, Chip, LinearProgress, Skeleton
} from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { useGetAssignmentsQuery } from '../../services/api'

export default function StudentAssignments() {
  const { data: assignments, isLoading } = useGetAssignmentsQuery()
  const myAssignments = assignments?.filter(a => a.className === '3ème A') ?? []

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Mes devoirs</Typography>
        <Typography variant="body2" color="text.secondary">{myAssignments.length} devoir(s) en cours</Typography>
      </Box>

      {isLoading ? (
        <Box>{[...Array(3)].map((_, i) => <Skeleton key={i} height={120} sx={{ mb: 1.5, borderRadius: 2 }} />)}</Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {myAssignments.map(a => {
            const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / 86400000)
            const isOverdue = daysLeft <= 0
            return (
              <Card key={a.id} sx={{ border: '1px solid', borderColor: isOverdue ? '#EF9A9A' : 'divider', bgcolor: isOverdue ? '#FFF8F8' : 'background.paper' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Assignment sx={{ color: 'white' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography fontWeight={700}>{a.title}</Typography>
                          <Chip label={a.subject} size="small" color="primary" variant="outlined" />
                        </Box>
                        <Chip
                          label={isOverdue ? 'Expiré' : `J-${daysLeft}`}
                          size="small"
                          color={isOverdue ? 'error' : daysLeft <= 3 ? 'warning' : 'success'}
                          sx={{ fontWeight: 700 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{a.description}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Prof: {a.teacherName} • À rendre le: <strong>{new Date(a.dueDate).toLocaleDateString('fr-DZ')}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
