import {
  Box, Typography, Grid, Card, CardContent, Paper, Chip,
  Avatar, Divider, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material'
import {
  Class, Assignment, HowToReg, Schedule, TrendingUp
} from '@mui/icons-material'
import { useGetClassesQuery, useGetAssignmentsQuery, useGetExamsQuery } from '../../services/api'
import { useAppSelector } from '../../app/hooks'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const attendanceData = [
  { day: 'Lun', taux: 95 }, { day: 'Mar', taux: 98 },
  { day: 'Mer', taux: 91 }, { day: 'Jeu', taux: 96 }, { day: 'Sam', taux: 88 },
]

export default function TeacherDashboard() {
  const { user } = useAppSelector(s => s.auth)
  const { data: classes } = useGetClassesQuery()
  const { data: assignments } = useGetAssignmentsQuery()
  const { data: exams } = useGetExamsQuery()

  const myClasses = classes?.filter(c => c.teacherName === user?.name) ?? []
  const myAssignments = assignments?.filter(a => a.teacherId === 't1') ?? []
  const upcomingExams = exams?.filter(e => e.status === 'scheduled') ?? []

  return (
    <Box>
      {/* Welcome */}
      <Box sx={{
        p: 3, mb: 3, borderRadius: 3,
        background: 'linear-gradient(135deg, #0D47A1, #1E88E5)',
        color: 'white',
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Bonjour, {user?.name} 👋
            </Typography>
            <Typography sx={{ opacity: 0.85, mt: 0.5 }}>
              {new Date().toLocaleDateString('fr-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
          <Avatar sx={{ width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.2)', fontSize: '1.2rem', fontWeight: 700 }}>
            {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
        </Box>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {[
          { label: 'Mes classes', value: myClasses.length, icon: <Class />, color: '#1565C0' },
          { label: 'Devoirs actifs', value: myAssignments.filter(a => a.status === 'active').length, icon: <Assignment />, color: '#388E3C' },
          { label: 'Examens à venir', value: upcomingExams.length, icon: <Schedule />, color: '#F57C00' },
          { label: 'Taux présence moyen', value: '94%', icon: <HowToReg />, color: '#6A1B9A' },
        ].map(s => (
          <Grid item xs={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                    <Typography variant="h4" fontWeight={700}>{s.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: s.color, width: 40, height: 40, borderRadius: 2 }}>{s.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        {/* Attendance Chart */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp color="primary" />
                <Typography variant="h6">Taux de présence – 3ème A (semaine)</Typography>
              </Box>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="day" tick={{ fontSize: 13 }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 13 }} />
                  <Tooltip formatter={(v) => [`${v}%`, 'Présence']} />
                  <Bar dataKey="taux" fill="#1565C0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Exams */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Examens à venir</Typography>
              <Divider sx={{ mb: 1.5 }} />
              {upcomingExams.length === 0 ? (
                <Typography variant="body2" color="text.secondary">Aucun examen planifié</Typography>
              ) : (
                <List dense disablePadding>
                  {upcomingExams.map(exam => (
                    <ListItem key={exam.id} disableGutters sx={{ py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Schedule sx={{ fontSize: 16, color: 'white' }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={exam.title}
                        secondary={`${new Date(exam.date).toLocaleDateString('fr-DZ')} • ${exam.className}`}
                        primaryTypographyProps={{ fontSize: '0.83rem', fontWeight: 500 }}
                        secondaryTypographyProps={{ fontSize: '0.75rem' }}
                      />
                      <Chip label={exam.type} size="small" sx={{ ml: 1 }} />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* My Classes */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Mes classes</Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {myClasses.map(cls => (
                  <Paper key={cls.id} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', minWidth: 160 }}>
                    <Typography fontWeight={700} color="primary">{cls.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{cls.studentCount} élèves • {cls.room}</Typography>
                  </Paper>
                ))}
                {myClasses.length === 0 && (
                  <Typography variant="body2" color="text.secondary">Aucune classe assignée</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
