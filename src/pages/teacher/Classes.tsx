import {
  Box, Typography, Card, CardContent, Grid, Paper,
  LinearProgress, Chip, Button
} from '@mui/material'
import { People, MenuBook } from '@mui/icons-material'
import { useGetClassesQuery, useGetSubjectsQuery } from '../../services/api'

export default function TeacherClasses() {
  const { data: classes } = useGetClassesQuery()
  const { data: subjects } = useGetSubjectsQuery()

  const myClasses = classes?.filter(c => c.teacherId === 't1') ?? []
  const mySubjects = subjects?.filter(s => s.teacherId === 't1') ?? []

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Mes classes</Typography>
        <Typography variant="body2" color="text.secondary">
          {myClasses.length} classe(s) • {mySubjects.length} matière(s)
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {myClasses.map(cls => {
          const fill = (cls.studentCount / cls.capacity) * 100
          return (
            <Grid item xs={12} sm={6} md={4} key={cls.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{
                    bgcolor: 'primary.main', color: 'white', p: 2,
                    borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between',
                  }}>
                    <Box>
                      <Typography variant="h5" fontWeight={700}>{cls.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>{cls.level}</Typography>
                    </Box>
                    <Box sx={{
                      width: 40, height: 40, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <People />
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">Effectif</Typography>
                      <Typography variant="body2" fontWeight={600}>{cls.studentCount}/{cls.capacity}</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={fill} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {[
                      ['Salle', cls.room],
                      ['Professeur principal', cls.teacherName],
                    ].map(([k, v]) => (
                      <Box key={k} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">{k}</Typography>
                        <Typography variant="caption" fontWeight={500}>{v}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" fullWidth>Présences</Button>
                    <Button size="small" variant="contained" fullWidth>Notes</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}

        {/* My subjects */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MenuBook color="primary" />
                <Typography variant="h6">Mes matières</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {mySubjects.map(sub => (
                  <Paper key={sub.id} sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', minWidth: 200 }}>
                    <Typography fontWeight={700} color="primary.dark">{sub.name}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{sub.weeklyHours}h/semaine • Coef. {sub.coefficient}</Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {sub.classes.map(c => <Chip key={c} label={c} size="small" color="primary" variant="outlined" />)}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
