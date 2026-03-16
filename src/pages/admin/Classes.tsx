import {
  Box, Typography, Card, CardContent, Grid, LinearProgress,
  Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Tooltip, Skeleton
} from '@mui/material'
import { Add, Edit, Delete, People } from '@mui/icons-material'
import { useGetClassesQuery } from '../../services/api'

export default function AdminClasses() {
  const { data: classes, isLoading } = useGetClassesQuery()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Gestion des classes</Typography>
          <Typography variant="body2" color="text.secondary">Créez et gérez les classes de l'établissement</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Nouvelle classe</Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {['3ème', '4ème', '5ème'].map(level => {
          const count = classes?.filter(c => c.level === level).length ?? 0
          return (
            <Grid item xs={12} sm={4} key={level}>
              <Card sx={{ background: 'linear-gradient(135deg, #EBF3FF, #DCEEFB)', border: '1px solid #BBDEFB' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" color="primary.dark">{level}</Typography>
                  <Typography variant="h3" fontWeight={700}>{count}</Typography>
                  <Typography variant="caption" color="text.secondary">classe{count > 1 ? 's' : ''}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Liste des classes</Typography>
          {isLoading ? (
            <Box>{[...Array(4)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Classe</TableCell>
                    <TableCell>Niveau</TableCell>
                    <TableCell>Professeur principal</TableCell>
                    <TableCell>Salle</TableCell>
                    <TableCell>Effectif</TableCell>
                    <TableCell>Capacité</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(classes ?? []).map(cls => {
                    const fillPercent = (cls.studentCount / cls.capacity) * 100
                    const isFull = fillPercent >= 90
                    return (
                      <TableRow key={cls.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                              width: 36, height: 36, borderRadius: 1.5, bgcolor: 'primary.main',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                            }}>
                              <People fontSize="small" />
                            </Box>
                            <Typography fontWeight={600}>{cls.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={cls.level} size="small" color="primary" variant="outlined" /></TableCell>
                        <TableCell><Typography variant="body2">{cls.teacherName}</Typography></TableCell>
                        <TableCell>{cls.room}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>{cls.studentCount} élèves</Typography>
                            <LinearProgress
                              variant="determinate"
                              value={fillPercent}
                              color={isFull ? 'error' : 'primary'}
                              sx={{ height: 4, borderRadius: 2, mt: 0.5, width: 80 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{cls.capacity}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
