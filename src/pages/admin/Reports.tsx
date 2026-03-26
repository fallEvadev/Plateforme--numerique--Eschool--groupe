import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, Button, Grid, Chip, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Divider
} from '@mui/material'
import { 
  CheckCircle, Visibility, Topic, Search, Summarize, 
  AutoMode, Assessment, PictureAsPdf, Key, Edit,
  Share, WhatsApp, Sms
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setDailyCode, publishCode, updateReportStatus, editReport } from '../../features/auth/authSlice'

export default function Reports() {
  const dispatch = useAppDispatch()
  const { dailyPedagogicalCode, isCodePublished, reports: globalReports = [] } = useAppSelector(s => s.auth)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [openReviewDialog, setOpenReviewDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [isAggregating, setIsAggregating] = useState(false)

  // Edit State
  const [editData, setEditData] = useState<any>(null)

  const generateDailyCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    dispatch(setDailyCode(code))
  }

  const handleReview = (report: any) => {
    setSelectedReport(report)
    setOpenReviewDialog(true)
  }

  const handleOpenEdit = (report: any) => {
    setEditData({ ...report })
    setOpenEditDialog(true)
  }

  const handleSaveEdit = () => {
    if (editData) {
      dispatch(editReport(editData))
      setOpenEditDialog(false)
    }
  }

  const handleUpdateStatus = (id: string, newStatus: any) => {
    dispatch(updateReportStatus({ id, status: newStatus }))
    setOpenReviewDialog(false)
  }

  const handleAggregation = (type: 'hebdomadaire' | 'mensuel') => {
    setIsAggregating(true)
    setTimeout(() => {
      const htmlContent = `<h1>E-SCHOOL BILAN</h1><p>Type: ${type}</p>`
      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Bilan_${type}.doc`
      link.click()
      setIsAggregating(false)
    }, 1000)
  }

  const filteredReports = (globalReports || []).filter(r => 
    r?.formateur?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r?.school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r?.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r?.content?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingCount = (globalReports || []).filter(r => r?.status === 'en_attente').length

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
            Direction Pédagogique
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
             Suivi des rapports et gestion des accès formateurs.
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button 
            variant="outlined" 
            startIcon={<AutoMode />} 
            onClick={() => handleAggregation('hebdomadaire')}
            disabled={isAggregating}
          >
            Agréger Hebdo
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Summarize />} 
            onClick={() => handleAggregation('mensuel')}
            disabled={isAggregating}
          >
            Bilan Mensuel
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, border: '1px solid #E3F2FD', bgcolor: '#F9FCFF', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Key color="primary" /> Gestion des accès
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                    Code actif (24h)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 2 }}>
                    {dailyPedagogicalCode || '------'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={generateDailyCode}
                    sx={{ borderRadius: 2, px: 2, py: 1.5, fontWeight: 700 }}
                  >
                    {dailyPedagogicalCode ? 'Renouveler' : 'Générer'}
                  </Button>
                  <Button 
                    variant={isCodePublished ? "contained" : "outlined"} 
                    color="success" 
                    disabled={!dailyPedagogicalCode || isCodePublished}
                    onClick={() => dispatch(publishCode())}
                    startIcon={<CheckCircle />}
                    sx={{ borderRadius: 2, px: 2, py: 1.5, fontWeight: 700 }}
                  >
                    {isCodePublished ? 'Code Publié' : 'Publier sur l\'Espace Partenaire'}
                  </Button>
                </Box>
              </Box>
              {!dailyPedagogicalCode && (
                <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                  Aucun code généré aujourd'hui. Les formateurs ne peuvent pas remplir leurs rapports.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
               <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">Rapports en attente</Typography>
                  <Typography variant="h4" fontWeight={800}>{pendingCount}</Typography>
               </Box>
               <Topic sx={{ fontSize: 48, color: pendingCount > 0 ? 'warning.main' : 'success.main', opacity: 0.5 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0' }}>
          <TextField
            size="small"
            placeholder="Rechercher Formateur, Sujet, Contenu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <Search color="action" sx={{ mr: 1 }} /> }}
            sx={{ minWidth: 320, bgcolor: 'grey.50' }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F5F9FF' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Formateur</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Heure & Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Sujet / Classe</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Contenu (Aperçu)</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports?.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{report.formateur}</Typography>
                    <Typography variant="caption" color="text.secondary">{report.school}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{report.startTime} - {report.endTime}</Typography>
                    <Typography variant="caption" color="text.secondary">{report.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>{report.subject}</Typography>
                    <Typography variant="caption" color="text.secondary">{report.className}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200, color: 'text.secondary' }}>{report.content}</Typography>
                  </TableCell>
                  <TableCell>
                    {report.status === 'valide' && <Chip size="small" color="success" label="Validé" sx={{ fontWeight: 700 }} />}
                    {report.status === 'en_attente' && <Chip size="small" color="warning" label="En attente de vérification" sx={{ fontWeight: 700 }} />}
                    {report.status === 'a_modifier' && <Chip size="small" color="error" label="Refusé" />}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {report.status === 'en_attente' && (
                        <>
                          <Button 
                            size="small" 
                            color="success" 
                            onClick={() => handleUpdateStatus(report.id, 'valide')}
                            sx={{ fontWeight: 600 }}
                          >
                            Valider
                          </Button>
                          <Button 
                            size="small" 
                            color="error" 
                            onClick={() => handleUpdateStatus(report.id, 'a_modifier')}
                            sx={{ fontWeight: 600 }}
                          >
                            Refuser
                          </Button>
                        </>
                      )}
                      <Button size="small" startIcon={<Edit />} onClick={() => handleOpenEdit(report)} color="primary">
                        Modifier
                      </Button>
                      <Button size="small" startIcon={<Visibility />} onClick={() => handleReview(report)}>
                        Détails
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {(filteredReports?.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Aucun rapport disponible pour le moment.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Review Dialog */}
      <Dialog open={openReviewDialog} onClose={() => setOpenReviewDialog(false)} maxWidth="sm" fullWidth>
        {selectedReport && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>Détails du Rapport - {selectedReport.formateur}</DialogTitle>
            <Divider />
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Sujet</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedReport.subject}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Classe</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedReport.className}</Typography>
                </Grid>
                <Grid item xs={12}>
                   <Box sx={{ p: 2, bgcolor: '#FAFAFA', borderRadius: 2, border: '1px solid #E0E0E0', mt: 1 }}>
                     <Typography variant="subtitle2" color="text.secondary" gutterBottom>Contenu du cours</Typography>
                     <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{selectedReport.content}</Typography>
                   </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpenReviewDialog(false)}>Fermer</Button>
              {selectedReport.status !== 'valide' && (
                <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                  <Button color="error" onClick={() => handleUpdateStatus(selectedReport.id, 'a_modifier')}>Refuser</Button>
                  <Button variant="contained" color="success" onClick={() => handleUpdateStatus(selectedReport.id, 'valide')}>Valider</Button>
                </Box>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        {editData && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>Modifier le Rapport - {editData.formateur}</DialogTitle>
            <Divider />
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 3 }}>
              <TextField
                label="Sujet"
                fullWidth
                value={editData.subject}
                onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
              />
              <TextField
                label="Classe"
                fullWidth
                value={editData.className}
                onChange={(e) => setEditData({ ...editData, className: e.target.value })}
              />
              <TextField
                label="Contenu du cours"
                fullWidth
                multiline
                rows={6}
                value={editData.content}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
              <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                Enregistrer les modifications
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}
