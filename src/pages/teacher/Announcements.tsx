import { Box, Typography, Paper, Chip, Avatar, Skeleton } from '@mui/material'
import { PushPin, Campaign } from '@mui/icons-material'
import { useGetAnnouncementsQuery } from '../../services/api'

export default function TeacherAnnouncements() {
  const { data: announcements, isLoading } = useGetAnnouncementsQuery('teacher')

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Annonces</Typography>
        <Typography variant="body2" color="text.secondary">Communications de la direction et de l'administration</Typography>
      </Box>

      {isLoading ? (
        <Box>{[...Array(3)].map((_, i) => <Skeleton key={i} height={120} sx={{ mb: 1.5, borderRadius: 2 }} />)}</Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {(announcements ?? []).map(ann => (
            <Paper key={ann.id} sx={{
              p: 2.5, borderRadius: 2,
              border: `1px solid ${ann.priority === 'high' ? '#EF9A9A' : ann.priority === 'medium' ? '#FFCC80' : '#E0E0E0'}`,
              bgcolor: ann.pinned ? (ann.priority === 'high' ? '#FFF8F8' : '#FFFFF8') : 'background.paper',
            }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 44, height: 44 }}>
                  <Campaign />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    {ann.pinned && <PushPin sx={{ fontSize: 14, color: 'primary.main' }} />}
                    <Typography fontWeight={700}>{ann.title}</Typography>
                    <Chip
                      label={ann.priority === 'high' ? 'Urgent' : ann.priority === 'medium' ? 'Importante' : 'Info'}
                      size="small"
                      color={ann.priority === 'high' ? 'error' : ann.priority === 'medium' ? 'warning' : 'default'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.6 }}>{ann.content}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {ann.author} • {new Date(ann.date).toLocaleDateString('fr-DZ')}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
          {announcements?.length === 0 && (
            <Typography variant="body2" color="text.secondary">Aucune annonce disponible.</Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
