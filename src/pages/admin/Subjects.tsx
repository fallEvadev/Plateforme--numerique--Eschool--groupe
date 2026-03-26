import {
  Box, Typography, Card, CardContent, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip,
  IconButton, Tooltip, Skeleton, Avatar
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useGetSubjectsQuery } from '../../services/api'

const COEF_COLORS = ['', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5']

export default function AdminSubjects() {
  const { data: subjects, isLoading } = useGetSubjectsQuery()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Gestion des matières</Typography>
          <Typography variant="body2" color="text.secondary">Gérez les matières enseignées et leurs coefficients</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Nouvelle matière</Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(5)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Matière</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Formateur</TableCell>
                    <TableCell>Classes</TableCell>
                    <TableCell>H/semaine</TableCell>
                    <TableCell>Coefficient</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(subjects ?? []).map(sub => (
                    <TableRow key={sub.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', borderRadius: 2, fontSize: '0.8rem', fontWeight: 700 }}>
                            {sub.code.slice(0, 2)}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600} variant="body2">{sub.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{sub.description}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={sub.code} size="small" variant="outlined" /></TableCell>
                      <TableCell><Typography variant="body2">{sub.teacherName}</Typography></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {sub.classes.map(c => <Chip key={c} label={c} size="small" color="primary" variant="outlined" />)}
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={`${sub.weeklyHours}h`} size="small" /></TableCell>
                      <TableCell>
                        <Chip
                          label={`Coef. ${sub.coefficient}`}
                          size="small"
                          sx={{ bgcolor: COEF_COLORS[sub.coefficient], fontWeight: 700, color: 'primary.dark' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
