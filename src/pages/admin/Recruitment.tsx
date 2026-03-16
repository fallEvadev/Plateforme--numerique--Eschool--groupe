import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Grid, Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Alert
} from '@mui/material'
import { CloudUpload, Visibility, CheckCircle, Cancel, Work } from '@mui/icons-material'

// Mock Data
const MOCK_APPLICATIONS = [
  { id: 'CAND-101', name: 'Karim Yelles', email: 'k.yelles@gmail.com', subject: 'Mathématiques', status: 'en_attente', date: '2026-03-14' },
  { id: 'CAND-102', name: 'Leila Mansouri', email: 'leila.man@yahoo.fr', subject: 'Physique', status: 'accepte', date: '2026-03-12' },
]

export default function Recruitment() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  
  // New Application Form State
  const [successMsg, setSuccessMsg] = useState('')
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', cv: null, cni: null, photo: null
  })

  // Simulated File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here we would use FormData to send files to the PHP backend
    // const payload = new FormData()
    // payload.append('cv', formData.cv) ...
    // fetch('/api/recruitment.php', { method: 'POST', body: payload })

    setSuccessMsg('Candidature soumise avec succès.')
    setTimeout(() => setSuccessMsg(''), 3000)
    setFormData({ name: '', email: '', subject: '', cv: null, cni: null, photo: null })
  }

  const handleReview = (candidate: any) => {
    setSelectedCandidate(candidate)
    setOpenDialog(true)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.dark' }}>
        Gestion du Recrutement
      </Typography>

      <Grid container spacing={4}>
        {/* Application Form (could be public facing, shown here for Admin demo) */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'primary.light' }}><Work /></Avatar>
                <Typography variant="h6" fontWeight={700}>Nouvelle Candidature</Typography>
              </Box>

              {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField 
                  label="Nom complet" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                />
                <TextField 
                  label="Email" type="email" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                />
                <TextField 
                  label="Matière / Spécialité" 
                  value={formData.subject} 
                  onChange={e => setFormData({...formData, subject: e.target.value})} 
                  required 
                />

                <Box sx={{ p: 2, border: '1px dashed #BDBDBD', borderRadius: 2, bgcolor: '#FAFAFA' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>Documents Requis</Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button component="label" fullWidth variant="outlined" startIcon={<CloudUpload />}>
                        {formData.cv ? 'CV Sélectionné' : 'Uploader le CV (.pdf)'}
                        <input type="file" hidden accept=".pdf" onChange={e => handleFileChange(e, 'cv')} required />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button component="label" fullWidth variant="outlined" startIcon={<CloudUpload />}>
                        {formData.cni ? 'CNI Sélectionnée' : 'Uploader la CNI (.jpg, .pdf)'}
                        <input type="file" hidden onChange={e => handleFileChange(e, 'cni')} required />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button component="label" fullWidth variant="outlined" startIcon={<CloudUpload />}>
                        {formData.photo ? 'Photo Sélectionnée' : 'Uploader la Photo (.jpg)'}
                        <input type="file" hidden accept="image/*" onChange={e => handleFileChange(e, 'photo')} required />
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, mt: 1 }}>
                  Soumettre la candidature
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* List of Applications */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Candidatures Récentes</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: '#F5F9FF' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Candidat</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Spécialité</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>{app.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{app.email}</Typography>
                        </TableCell>
                        <TableCell>{app.subject}</TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={app.status === 'accepte' ? 'Accepté' : 'En attente'} 
                            color={app.status === 'accepte' ? 'success' : 'warning'} 
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" color="primary" onClick={() => handleReview(app)}>
                            <Visibility fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Review Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {selectedCandidate && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>
              Dossier de candidature : {selectedCandidate.name}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                 <Grid item xs={12} sm={4}>
                    <Box sx={{ width: '100%', height: 120, bgcolor: 'grey.200', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Photo Portrait</Typography>
                    </Box>
                 </Grid>
                 <Grid item xs={12} sm={8}>
                    <Typography variant="subtitle2" color="text.secondary">Contact</Typography>
                    <Typography variant="body1" fontWeight={500} gutterBottom>{selectedCandidate.email}</Typography>
                    
                    <Typography variant="subtitle2" color="text.secondary">Spécialité</Typography>
                    <Typography variant="body1" fontWeight={500}>{selectedCandidate.subject}</Typography>
                 </Grid>
                 <Grid item xs={12}>
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                      <Button variant="outlined" startIcon={<Visibility />}>Voir CV</Button>
                      <Button variant="outlined" startIcon={<Visibility />}>Voir CNI</Button>
                    </Box>
                 </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button color="error" startIcon={<Cancel />}>Rejeter</Button>
              <Button variant="contained" color="success" startIcon={<CheckCircle />}>Valider & Créer Contrat</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
