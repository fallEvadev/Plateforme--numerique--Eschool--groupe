import {
  Box, Typography, Card, CardContent, Button, Grid, Chip,
  IconButton, Tooltip, Paper, Avatar, Skeleton
} from '@mui/material'
import { Add, PushPin, Edit, Delete, Campaign } from '@mui/icons-material'
import { useGetAnnouncementsQuery } from '../../services/api'

const PRIORITY_COLORS = {
  high: { bg: '#FFEBEE', border: '#EF9A9A', text: '#C62828', label: 'Priorité haute' },
  medium: { bg: '#FFF3E0', border: '#FFCC80', text: '#E65100', label: 'Priorité moyenne' },
  low: { bg: '#F5F5F5', border: '#E0E0E0', text: '#616161', label: 'Priorité basse' },
}

export default function AdminAnnouncements() {
  const { data: announcements, isLoading } = useGetAnnouncementsQuery()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Annonces</Typography>
          <Typography variant="body2" color="text.secondary">Gérez les communications de l'établissement</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />}>Nouvelle annonce</Button>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>{[...Array(4)].map((_, i) => <Grid item xs={12} key={i}><Skeleton height={120} sx={{ borderRadius: 2 }} /></Grid>)}</Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {(announcements ?? []).map(ann => {
            const p = PRIORITY_COLORS[ann.priority]
            return (
              <Paper key={ann.id} sx={{
                p: 2.5, borderRadius: 2, border: '1px solid',
                borderColor: p.border, bgcolor: ann.pinned ? p.bg : 'background.paper',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                      <Campaign />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                        {ann.pinned && <PushPin sx={{ fontSize: 16, color: 'primary.main' }} />}
                        <Typography variant="h6" sx={{ fontSize: '0.95rem' }}>{ann.title}</Typography>
                        <Chip label={p.label} size="small" sx={{ bgcolor: p.bg, color: p.text, fontWeight: 600, border: `1px solid ${p.border}` }} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.6 }}>
                        {ann.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="caption" color="text.secondary">
                          {ann.author} • {new Date(ann.date).toLocaleDateString('fr-DZ')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">• Pour:</Typography>
                        {ann.targetRoles.map(r => (
                          <Chip key={r} label={r} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                    <Tooltip title="Modifier"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                    <Tooltip title="Supprimer"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
                  </Box>
                </Box>
              </Paper>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
