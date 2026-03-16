import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Grid, Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Select, MenuItem, FormControl, 
  InputLabel, InputAdornment
} from '@mui/material'
import { Search, AssignmentTurnedIn, Edit, Block, FileDownload, HistoryEdu } from '@mui/icons-material'

// Mock Data
const MOCK_CONTRACTS = [
  { id: 'CTR-001', name: 'Mohammed Chérif', role: 'Administrateur', startDate: '2025-09-01', endDate: '2026-08-31', status: 'actif' },
  { id: 'CTR-002', name: 'Prof. Rachid Boumediene', role: 'Formateur', startDate: '2026-01-15', endDate: '2026-06-30', status: 'actif' },
  { id: 'CTR-003', name: 'Amina Benali', role: 'Formateur', startDate: '2025-09-01', endDate: '2025-12-31', status: 'expire' },
  { id: 'CTR-004', name: 'Omar Tech', role: 'Maintenancier', startDate: '2026-02-01', endDate: '2027-01-31', status: 'actif' },
]

export default function Contracts() {
  const [contracts] = useState(MOCK_CONTRACTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Metrics
  const activeCount = contracts.filter(c => c.status === 'actif').length
  const expiredCount = contracts.filter(c => c.status === 'expire').length

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Gestion Contractuelle
        </Typography>
        <Button variant="contained" startIcon={<HistoryEdu />} size="large" sx={{ borderRadius: 2 }}>
          Nouveau Contrat
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography color="success.dark" variant="subtitle2" fontWeight={600}>Contrats Actifs</Typography>
              <Typography variant="h3" color="success.main" fontWeight={700}>{activeCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography color="error.dark" variant="subtitle2" fontWeight={600}>Contrats Expirés</Typography>
              <Typography variant="h3" color="error.main" fontWeight={700}>{expiredCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 0 }}>
           {/* Toolbar */}
           <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0', display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Rechercher un collaborateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <Search color="action" sx={{ mr: 1 }} /> }}
              sx={{ minWidth: 280, bgcolor: 'grey.50' }}
            />
            <FormControl size="small" sx={{ minWidth: 200, bgcolor: 'grey.50' }}>
              <Select
                displayEmpty
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">Tous les statuts</MenuItem>
                <MenuItem value="actif">Actif</MenuItem>
                <MenuItem value="expire">Expiré / Désactivé</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#F5F9FF' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>N° Contrat</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Collaborateur</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Rôle</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Période</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">{contract.id}</Typography></TableCell>
                    <TableCell>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 30, height: 30, fontSize: '0.8rem', bgcolor: 'primary.main' }}>
                            {contract.name.charAt(0)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={600}>{contract.name}</Typography>
                       </Box>
                    </TableCell>
                    <TableCell>{contract.role}</TableCell>
                    <TableCell>
                       <Typography variant="caption" display="block">Début: {contract.startDate}</Typography>
                       <Typography variant="caption" color="error.main">Fin: {contract.endDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        label={contract.status === 'actif' ? 'Actif' : 'Expiré'} 
                        color={contract.status === 'actif' ? 'success' : 'error'} 
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" title="Télécharger le contrat">
                        <FileDownload fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="primary" title="Modifier la période">
                        <Edit fontSize="small" />
                      </IconButton>
                      {contract.status === 'actif' && (
                        <IconButton size="small" color="error" title="Désactiver l'accès">
                          <Block fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
           * Note : À la fin d'un contrat, l'accès du collaborateur à la plateforme est automatiquement désactivé, mais ses données sont conservées pour archivage, conformément aux spécifications V 2.7.
        </Typography>
      </Box>
    </Box>
  )
}
