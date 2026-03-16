import { Box, Typography, Card, CardContent, Grid, Paper, Chip, Skeleton } from '@mui/material'
import { useGetTimetableQuery } from '../../services/api'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Samedi']

const SUBJECT_COLORS: Record<string, string> = {
  'Mathématiques': '#E3F2FD',
  'Français': '#F3E5F5',
  'Sciences Naturelles': '#E8F5E9',
  'Histoire-Géographie': '#FFF3E0',
  'Physique-Chimie': '#FCE4EC',
  'Arabe': '#E0F7FA',
}

export default function StudentTimetable() {
  const { data: timetable, isLoading } = useGetTimetableQuery('3ème A')

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Mon emploi du temps</Typography>
        <Typography variant="body2" color="text.secondary">3ème A — Semaine courante</Typography>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>
          {DAYS.map(d => <Grid item xs={12} sm={6} md={4} key={d}><Skeleton height={200} sx={{ borderRadius: 2 }} /></Grid>)}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {DAYS.map(day => {
            const entries = (timetable ?? []).filter(t => t.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
            return (
              <Grid item xs={12} sm={6} md key={day}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 1.5, px: 1.5, py: 0.75, mb: 1.5, textAlign: 'center' }}>
                      <Typography fontWeight={700}>{day}</Typography>
                    </Box>
                    {entries.length === 0 ? (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', py: 2 }}>Pas de cours</Typography>
                    ) : entries.map(e => (
                      <Paper key={e.id} sx={{ p: 1.25, mb: 1, borderRadius: 1.5, bgcolor: SUBJECT_COLORS[e.subject] ?? '#F5F5F5', border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="caption" fontWeight={700} color="primary.dark" display="block">{e.startTime}–{e.endTime}</Typography>
                        <Typography variant="body2" fontWeight={600}>{e.subject}</Typography>
                        <Typography variant="caption" color="text.secondary">{e.room}</Typography>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      <Box sx={{ mt: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {Object.entries(SUBJECT_COLORS).map(([sub, color]) => (
          <Chip key={sub} label={sub} size="small" sx={{ bgcolor: color }} />
        ))}
      </Box>
    </Box>
  )
}
