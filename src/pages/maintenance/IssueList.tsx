import { useState } from 'react'
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Grid, Avatar, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel
} from '@mui/material'
import { Build, CheckCircle, BuildCircle, Search, FilterList } from '@mui/icons-material'

// Mock data matching the Formateur's DailyReport output
const MOCK_ISSUES = [
  {
    id: 'PAN-001',
    schoolName: 'Lycée Emir Abdelkader',
    machineNumber: 'PC-12',
    reportedBy: 'Prof. Rachid Boumediene',
    date: '2026-03-14',
    status: 'signalée',
  },
  {
    id: 'PAN-002',
    schoolName: 'Lycée Emir Abdelkader',
    machineNumber: 'PC-24',
    reportedBy: 'Prof. Rachid Boumediene',
    date: '2026-03-14',
    status: 'en_cours',
  },
  {
    id: 'PAN-003',
    schoolName: 'Collège Ibn Sina',
    machineNumber: 'LAB1-05',
    reportedBy: 'Prof. Amina Benali',
    date: '2026-03-12',
    status: 'resolue',
  },
]

const statusConfig = {
  'signalée': { label: 'Signalée', color: 'error', icon: <Build fontSize="small" /> },
  'en_cours': { label: 'En cours', color: 'warning', icon: <BuildCircle fontSize="small" /> },
  'resolue': { label: 'Résolue', color: 'success', icon: <CheckCircle fontSize="small" /> },
} as const

type StatusType = keyof typeof statusConfig

export default function IssueList() {
  const [issues, setIssues] = useState(MOCK_ISSUES)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<StatusType | 'all'>('all')

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ))
    // Here we would sync with the PHP backend:
    // fetch('/api/update-issue-status.php', { method: 'POST', body: JSON.stringify({ id, newStatus }) })
  }

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.machineNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || issue.status === filterStatus

    return matchesSearch && matchesFilter
  })

  // Metrics
  const activeCount = issues.filter(i => i.status === 'signalée' || i.status === 'en_cours').length
  const resolvedCount = issues.filter(i => i.status === 'resolue').length

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Tableau de Bord Maintenancier
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography color="error.dark" variant="subtitle2" fontWeight={600}>Pannes Actives</Typography>
              <Typography variant="h3" color="error.main" fontWeight={700}>{activeCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: 3, boxShadow: 'none' }}>
            <CardContent>
              <Typography color="success.dark" variant="subtitle2" fontWeight={600}>Pannes Résolues</Typography>
              <Typography variant="h3" color="success.main" fontWeight={700}>{resolvedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Table */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 0 }}>
          {/* Toolbar */}
          <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0', display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              placeholder="Rechercher par n° machine, école..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <Search color="action" sx={{ mr: 1 }} /> }}
              sx={{ minWidth: 250, bgcolor: 'grey.50' }}
            />
            <FormControl size="small" sx={{ minWidth: 200, bgcolor: 'grey.50' }}>
              <Select
                displayEmpty
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                startAdornment={<FilterList color="action" sx={{ ml: 1, mr: 1 }} />}
              >
                <MenuItem value="all">Tous les statuts</MenuItem>
                <MenuItem value="signalée">Signalée</MenuItem>
                <MenuItem value="en_cours">En cours</MenuItem>
                <MenuItem value="resolue">Résolue</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Data Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#F5F9FF' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>ID Panne</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>Établissement</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>N° Machine</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>Signalé par</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>Statut & Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredIssues.length === 0 ? (
                   <TableRow>
                     <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                        Aucune panne trouvée.
                     </TableCell>
                   </TableRow>
                ) : (
                  filteredIssues.map((issue) => {
                    const statusConf = statusConfig[issue.status as StatusType]
                    return (
                      <TableRow key={issue.id} hover>
                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>{issue.id}</TableCell>
                        <TableCell>{issue.schoolName}</TableCell>
                        <TableCell>
                          <Chip size="small" label={issue.machineNumber} sx={{ bgcolor: 'grey.100', fontWeight: 600 }} />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.light' }}>
                              {issue.reportedBy.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">{issue.reportedBy}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{issue.date}</TableCell>
                        <TableCell>
                          <FormControl size="small" variant="standard" sx={{ minWidth: 130 }}>
                            <Select
                              disableUnderline
                              value={issue.status}
                              onChange={(e) => handleStatusChange(issue.id, e.target.value as StatusType)}
                              renderValue={(val) => {
                                const sc = statusConfig[val as StatusType]
                                return (
                                  <Chip
                                    size="small"
                                    icon={sc.icon}
                                    label={sc.label}
                                    color={sc.color as any}
                                    sx={{ fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' } }}
                                  />
                                )
                              }}
                            >
                              <MenuItem value="signalée">Signalée</MenuItem>
                              <MenuItem value="en_cours">En cours</MenuItem>
                              <MenuItem value="resolue">Résolue</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}
