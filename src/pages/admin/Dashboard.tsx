import { Box, Grid, Typography, Card, CardContent, Skeleton, Avatar } from '@mui/material'
import {
  People, School, MenuBook, TrendingUp, CheckCircle, StarRate
} from '@mui/icons-material'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import { useGetDashboardStatsQuery } from '../../services/api'

const PIE_COLORS = ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#42A5F5', '#90CAF9', '#BBDEFB']

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>{value}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48, borderRadius: 2 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery()

  if (isLoading) return (
    <Box>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {[...Array(6)].map((_, i) => <Grid item xs={12} sm={6} md={4} key={i}><Skeleton variant="rectangular" height={110} sx={{ borderRadius: 2 }} /></Grid>)}
      </Grid>
    </Box>
  )

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Tableau de bord</Typography>
        <Typography variant="body2" color="text.secondary">Vue d'ensemble de l'établissement</Typography>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Élèves" value={stats?.totalStudents ?? 0} icon={<People />} color="#1565C0" subtitle="Inscrits cette année" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Total Enseignants" value={stats?.totalTeachers ?? 0} icon={<School />} color="#1976D2" subtitle="Actifs" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Classes" value={stats?.totalClasses ?? 0} icon={<MenuBook />} color="#388E3C" subtitle="Niveaux actifs" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Matières" value={stats?.totalSubjects ?? 0} icon={<MenuBook />} color="#F57C00" subtitle="Enseignées" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Taux de présence" value={`${stats?.attendanceRate ?? 0}%`} icon={<CheckCircle />} color="#0288D1" subtitle="Moyenne trimestrielle" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Moyenne générale" value={`${stats?.averageGrade ?? 0}/20`} icon={<StarRate />} color="#6A1B9A" subtitle="Tous élèves confondus" />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Présences par jour (semaine courante)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats?.attendanceByDay} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Présents" fill="#1565C0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent" name="Absents" fill="#EF5350" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Répartition des notes</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={stats?.gradeDistribution} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={90} label={({ range }) => range}>
                    {stats?.gradeDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Inscriptions mensuelles</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={stats?.monthlyEnrollment}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" name="Nouveaux élèves" stroke="#1565C0" strokeWidth={2} dot={{ r: 4, fill: '#1565C0' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Performance par matière (moyenne)</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stats?.subjectPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="subject" type="category" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip />
                  <Bar dataKey="average" name="Moyenne /20" fill="#1E88E5" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
