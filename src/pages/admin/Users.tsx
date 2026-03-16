import { useState } from 'react'
import {
  Box, Typography, Card, CardContent, Tab, Tabs, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Avatar,
  IconButton, Button, TextField, InputAdornment, Tooltip, Skeleton
} from '@mui/material'
import { Search, Add, Edit, Delete, Visibility } from '@mui/icons-material'
import {
  useGetStudentsQuery, useGetTeachersQuery, useGetParentsQuery
} from '../../services/api'

function StatusChip({ status }: { status: string }) {
  return (
    <Chip
      label={status === 'active' ? 'Actif' : 'Inactif'}
      size="small"
      color={status === 'active' ? 'success' : 'default'}
      variant="outlined"
      sx={{ fontWeight: 600 }}
    />
  )
}

export default function AdminUsers() {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')

  const { data: students, isLoading: loadingStudents } = useGetStudentsQuery()
  const { data: teachers, isLoading: loadingTeachers } = useGetTeachersQuery()
  const { data: parents, isLoading: loadingParents } = useGetParentsQuery()

  const isLoading = loadingStudents || loadingTeachers || loadingParents

  const filteredStudents = students?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.className.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  const filteredTeachers = teachers?.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  const filteredParents = parents?.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Gestion des utilisateurs</Typography>
          <Typography variant="body2" color="text.secondary">Gérez les élèves, enseignants et parents</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Ajouter</Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label={`Élèves (${students?.length ?? 0})`} />
              <Tab label={`Enseignants (${teachers?.length ?? 0})`} />
              <Tab label={`Parents (${parents?.length ?? 0})`} />
            </Tabs>
            <TextField
              size="small"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: 'grey.400', fontSize: 18 }} /></InputAdornment> }}
              sx={{ width: 240 }}
            />
          </Box>

          {isLoading ? (
            <Box>{[...Array(5)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <>
              {tab === 0 && (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Élève</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Classe</TableCell>
                        <TableCell>Parent</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredStudents.map(s => (
                        <TableRow key={s.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light', fontSize: '0.75rem', fontWeight: 700 }}>{s.avatar}</Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{s.gender === 'M' ? 'Garçon' : 'Fille'} • {s.dateOfBirth}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell><Typography variant="body2">{s.email}</Typography></TableCell>
                          <TableCell><Chip label={s.className} size="small" color="primary" variant="outlined" /></TableCell>
                          <TableCell><Typography variant="body2">{s.parentName}</Typography></TableCell>
                          <TableCell><StatusChip status={s.status} /></TableCell>
                          <TableCell align="right">
                            <Tooltip title="Voir"><IconButton size="small"><Visibility fontSize="small" /></IconButton></Tooltip>
                            <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                            <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tab === 1 && (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Enseignant</TableCell>
                        <TableCell>Matière</TableCell>
                        <TableCell>Classes</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTeachers.map(t => (
                        <TableRow key={t.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.75rem', fontWeight: 700 }}>{t.avatar}</Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>{t.name}</Typography>
                                <Typography variant="caption" color="text.secondary">{t.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell><Chip label={t.subject} size="small" /></TableCell>
                          <TableCell>{t.classes.map(c => <Chip key={c} label={c} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                          <TableCell>{t.phone}</TableCell>
                          <TableCell><StatusChip status={t.status} /></TableCell>
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

              {tab === 2 && (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Parent</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Téléphone</TableCell>
                        <TableCell>Enfants</TableCell>
                        <TableCell>Profession</TableCell>
                        <TableCell>Statut</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredParents.map(p => (
                        <TableRow key={p.id} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>{p.name}</Typography>
                          </TableCell>
                          <TableCell>{p.email}</TableCell>
                          <TableCell>{p.phone}</TableCell>
                          <TableCell>{p.children.map(c => <Chip key={c} label={c} size="small" sx={{ mr: 0.5 }} />)}</TableCell>
                          <TableCell>{p.occupation}</TableCell>
                          <TableCell><StatusChip status={p.status} /></TableCell>
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
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
