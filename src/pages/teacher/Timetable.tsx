import {
  Box, Typography, Card, CardContent, Grid, Paper, Chip, Skeleton
} from '@mui/material'
import { useGetTimetableQuery } from '../../services/api'
import { useAppSelector } from '../../app/hooks'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Samedi', 'Dimanche']
const SUBJECT_COLORS: Record<string, string> = {
  'Mathématiques': '#E3F2FD',
  'Français': '#F3E5F5',
  'Sciences Naturelles': '#E8F5E9',
  'Histoire-Géographie': '#FFF3E0',
  'Physique-Chimie': '#FCE4EC',
  'Arabe': '#E0F7FA',
}

export default function TeacherTimetable() {
  const { user } = useAppSelector(s => s.auth)
  const { data: timetable, isLoading } = useGetTimetableQuery()

  const getEntriesByDay = (day: string) =>
    (timetable ?? [])
      .filter(t => t.day === day && (t.teacher === user?.name || user?.name === 'Prof. Fall'))
      .sort((a, b) => a.startTime.localeCompare(b.startTime))

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Mon Planning</Typography>
          <Typography variant="body2" color="text.secondary">
             Consultation de l'emploi du temps hebdomadaire validé par la Direction.
          </Typography>
        </Box>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>
          {DAYS.map(d => <Grid item xs={12} md={4} key={d}><Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} /></Grid>)}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {DAYS.map(day => {
            const entries = getEntriesByDay(day)
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={day}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{
                      bgcolor: 'primary.main', color: 'white', borderRadius: 1.5,
                      px: 1.5, py: 0.75, mb: 1.5, textAlign: 'center',
                    }}>
                      <Typography fontWeight={700} fontSize="0.9rem">{day}</Typography>
                    </Box>
                    {entries.length === 0 ? (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', py: 2 }}>
                        Aucun cours
                      </Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {entries.map(entry => (
                          <Paper key={entry.id} sx={{
                            p: 1.25, borderRadius: 1.5,
                            bgcolor: SUBJECT_COLORS[entry.subject] ?? '#F5F5F5',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}>
                            <Typography variant="caption" fontWeight={700} color="primary.dark" sx={{ display: 'block' }}>
                              {entry.startTime} – {entry.endTime}
                            </Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.25 }}>
                              {entry.subject}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {entry.className} • {entry.room}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      {/* Legend */}
      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {Object.entries(SUBJECT_COLORS).map(([sub, color]) => (
          <Chip key={sub} label={sub} size="small" sx={{ bgcolor: color, fontWeight: 500 }} />
        ))}
      </Box>
    </Box>
  )
}
