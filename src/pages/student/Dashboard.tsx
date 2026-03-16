import {
  Box, Typography, Grid, Card, CardContent, Avatar, Chip, Divider, LinearProgress, Paper, List, ListItem, ListItemText
} from '@mui/material'
import { Grade, Schedule, Assignment, TrendingUp } from '@mui/icons-material'
import { useAppSelector } from '../../app/hooks'
import { useGetGradesByStudentQuery, useGetTimetableQuery, useGetAssignmentsQuery } from '../../services/api'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function StudentDashboard() {
  const { user } = useAppSelector(s => s.auth)
  const { data: grades } = useGetGradesByStudentQuery('s1')
  const { data: timetable } = useGetTimetableQuery('3ème A')
  const { data: assignments } = useGetAssignmentsQuery()

  const avg = grades?.length
    ? (grades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1)
    : '–'

  const radarData = grades?.map(g => ({
    subject: g.subject.split(' ')[0],
    note: +(g.score / g.maxScore * 20).toFixed(1),
  })) ?? []

  const todayEntries = timetable?.filter(t => t.day === 'Lundi') ?? []
  const activeAssignments = assignments?.filter(a => a.className === '3ème A' && a.status === 'active') ?? []

  return (
    <Box>
      {/* Welcome Banner */}
      <Box sx={{
        p: 3, mb: 3, borderRadius: 3,
        background: 'linear-gradient(135deg, #1565C0, #42A5F5)',
        color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Bonjour, {user?.name} 👋</Typography>
          <Typography sx={{ opacity: 0.85, mt: 0.5 }}>Classe: {user?.className} • Année 2025–2026</Typography>
        </Box>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.2)', fontSize: '1.2rem', fontWeight: 700 }}>
          {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </Avatar>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Moyenne générale', value: `${avg}/20`, icon: <Grade />, color: '#1565C0' },
          { label: 'Cours aujourd\'hui', value: todayEntries.length, icon: <Schedule />, color: '#388E3C' },
          { label: 'Devoirs en attente', value: activeAssignments.length, icon: <Assignment />, color: '#F57C00' },
          { label: 'Rang en classe', value: '2ème', icon: <TrendingUp />, color: '#6A1B9A' },
        ].map(s => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                    <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: s.color, width: 38, height: 38, borderRadius: 2 }}>{s.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Radar chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Performance par matière</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="Note" dataKey="note" stroke="#1565C0" fill="#1565C0" fillOpacity={0.25} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's schedule */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Programme du jour (Lundi)</Typography>
              <Divider sx={{ mb: 1.5 }} />
              {todayEntries.map(entry => (
                <Paper key={entry.id} sx={{ p: 1.5, mb: 1, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: '#F8FBFF' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography fontWeight={600} variant="body2">{entry.subject}</Typography>
                      <Typography variant="caption" color="text.secondary">{entry.teacher} • {entry.room}</Typography>
                    </Box>
                    <Chip label={`${entry.startTime}–${entry.endTime}`} size="small" color="primary" variant="outlined" />
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming assignments */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Prochains devoirs à rendre</Typography>
              <Divider sx={{ mb: 1 }} />
              <List dense disablePadding>
                {activeAssignments.map(a => {
                  const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / 86400000)
                  return (
                    <ListItem key={a.id} disableGutters sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <ListItemText
                        primary={a.title}
                        secondary={`${a.subject} • ${a.teacherName}`}
                        primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        label={daysLeft > 0 ? `J-${daysLeft}` : 'Expiré'}
                        size="small"
                        color={daysLeft > 3 ? 'success' : daysLeft > 0 ? 'warning' : 'error'}
                        sx={{ fontWeight: 700 }}
                      />
                    </ListItem>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
