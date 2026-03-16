import {
  Box, Typography, Grid, Card, CardContent, Avatar, Chip, Paper, Divider, List, ListItem, ListItemText
} from '@mui/material'
import { Grade, HowToReg, Campaign, TrendingUp } from '@mui/icons-material'
import { useAppSelector } from '../../app/hooks'
import { useGetGradesByStudentQuery, useGetAttendanceQuery, useGetAnnouncementsQuery } from '../../services/api'

export default function ParentDashboard() {
  const { user } = useAppSelector(s => s.auth)
  const { data: grades } = useGetGradesByStudentQuery('s1')
  const { data: attendance } = useGetAttendanceQuery()
  const { data: announcements } = useGetAnnouncementsQuery('parent')

  const childAttendance = attendance?.filter(a => a.studentId === 's1') ?? []
  const presentDays = childAttendance.filter(a => a.status === 'present').length
  const total = childAttendance.length
  const attendanceRate = total ? ((presentDays / total) * 100).toFixed(0) : '—'

  const avg = grades?.length
    ? (grades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1)
    : '–'

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{
        p: 3, mb: 3, borderRadius: 3,
        background: 'linear-gradient(135deg, #0D47A1, #1976D2)',
        color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Bonjour, {user?.name} 👋</Typography>
          <Typography sx={{ opacity: 0.85, mt: 0.5 }}>
            Suivi de: <strong>{user?.childName}</strong> — Classe 3ème A
          </Typography>
        </Box>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.2)', fontWeight: 700, fontSize: '1.2rem' }}>
          {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </Avatar>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Moyenne générale', value: `${avg}/20`, icon: <Grade />, color: '#1565C0' },
          { label: 'Taux de présence', value: `${attendanceRate}%`, icon: <HowToReg />, color: '#388E3C' },
          { label: 'Absences', value: childAttendance.filter(a => a.status === 'absent').length, icon: <HowToReg />, color: '#E53935' },
          { label: 'Annonces récentes', value: announcements?.length ?? 0, icon: <Campaign />, color: '#F57C00' },
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
        {/* Recent grades */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Grade color="primary" />
                <Typography variant="h6">Dernières notes</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <List dense disablePadding>
                {(grades ?? []).slice(0, 4).map(g => (
                  <ListItem key={g.id} disableGutters sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <ListItemText
                      primary={g.subject}
                      secondary={g.examTitle}
                      primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: '0.75rem' }}
                    />
                    <Chip
                      label={`${g.score}/${g.maxScore}`}
                      size="small"
                      color={g.score / g.maxScore >= 0.7 ? 'success' : 'warning'}
                      sx={{ fontWeight: 700 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent announcements */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Campaign color="primary" />
                <Typography variant="h6">Annonces récentes</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              {(announcements ?? []).slice(0, 3).map(ann => (
                <Paper key={ann.id} sx={{ p: 1.5, mb: 1, borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight={600}>{ann.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(ann.date).toLocaleDateString('fr-DZ')}</Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
