import { useState } from 'react'
import {
  Box, Typography, Card, CardContent, Tab, Tabs, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Chip, Avatar,
  IconButton, Button, TextField, InputAdornment, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem
} from '@mui/material'
import { Search, Add, Edit, Delete, Visibility, Block } from '@mui/icons-material'
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
  const [tab, setTab] = useState(1)
  const [search, setSearch] = useState('')
  const [openAdd, setOpenAdd] = useState(false)
  const [openBlock, setOpenBlock] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', role: '' })

  const handleClose = () => {
    setOpenAdd(false)
    setOpenBlock(false)
    setFormData({ name: '', role: '' })
  }

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
          <Typography variant="body2" color="text.secondary">Gérez les élèves, formateurs et parents</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAdd(true)}>
          Ajouter un Formateur
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              {/* <Tab label={`Élèves (${students?.length ?? 0})`} /> */}
              <Tab label={`Formateurs (${teachers?.length ?? 0})`} />
              {/* <Tab label={`Parents (${parents?.length ?? 0})`} /> */}
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
                            <Tooltip title="Bloquer le compte">
                              <IconButton size="small" color="error" onClick={() => { setSelectedUser(s); setOpenBlock(true); }}>
                                <Block fontSize="small" />
                              </IconButton>
                            </Tooltip>
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
                        <TableCell>Formateur</TableCell>
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
                            <Tooltip title="Bloquer le compte">
                              <IconButton size="small" color="error" onClick={() => { setSelectedUser(t); setOpenBlock(true); }}>
                                <Block fontSize="small" />
                              </IconButton>
                            </Tooltip>
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
                            <Tooltip title="Bloquer le compte">
                              <IconButton size="small" color="error" onClick={() => { setSelectedUser(p); setOpenBlock(true); }}>
                                <Block fontSize="small" />
                              </IconButton>
                            </Tooltip>
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

      <Dialog open={openAdd} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700 }}>Ajouter un nouveau Formateur</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              fullWidth
              label="Nom complet"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Spécialité / Matière"
              placeholder="Ex: Informatique, Mathématiques..."
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">Annuler</Button>
          <Button variant="contained" onClick={handleClose}>Confirmer l'ajout</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Bloquer */}
      <Dialog open={openBlock} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>Bloquer le compte</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Voulez-vous vraiment bloquer l'accès de <strong>{selectedUser?.name}</strong> ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            L'utilisateur ne pourra plus se connecter à la plateforme.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleClose} color="inherit">Annuler</Button>
          <Button variant="contained" color="error" onClick={handleClose}>Bloquer définitivement</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
