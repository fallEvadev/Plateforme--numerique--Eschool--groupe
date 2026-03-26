import { Box, Grid, Typography, Card, CardContent, Skeleton, Avatar } from '@mui/material'
import {
  People, School, MenuBook
} from '@mui/icons-material'
import { useGetDashboardStatsQuery } from '../../services/api'

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
        {[...Array(3)].map((_, i) => <Grid item xs={12} sm={6} md={4} key={i}><Skeleton variant="rectangular" height={110} sx={{ borderRadius: 2 }} /></Grid>)}
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
          <StatCard title="Total Formateurs" value={stats?.totalTeachers ?? 0} icon={<School />} color="#1976D2" subtitle="Actifs" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Classes" value={stats?.totalClasses ?? 0} icon={<MenuBook />} color="#388E3C" subtitle="Niveaux actifs" />
        </Grid>
      </Grid>
    </Box>
  )
}
