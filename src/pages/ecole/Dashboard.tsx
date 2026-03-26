import {
  Box, Card, CardContent, Typography, Grid, Chip, Avatar, Alert
} from '@mui/material'
import { School, CheckCircle, Warning, VpnKey } from '@mui/icons-material'
import { useAppSelector } from '../../app/hooks'

export default function SchoolDashboard() {
  const { dailyPedagogicalCode, isCodePublished, user } = useAppSelector(s => s.auth)

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Espace Ecole Partenaire
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Bienvenue, {user?.name}. Suivez et validez les codes d'accès.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            border: '1px solid',
            borderColor: isCodePublished ? 'success.light' : 'divider',
            bgcolor: isCodePublished ? '#F6FFF8' : '#fff'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ 
                width: 60, height: 60, borderRadius: '50%', 
                bgcolor: isCodePublished ? 'success.main' : 'grey.200',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 2
              }}>
                <VpnKey sx={{ color: isCodePublished ? 'white' : 'grey.500' }} />
              </Box>
              
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Code de validation reçu
              </Typography>
              
              {isCodePublished ? (
                <Box>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 900, 
                    color: 'success.main', 
                    letterSpacing: 4,
                    my: 2
                  }}>
                    {dailyPedagogicalCode}
                  </Typography>
                  <Alert icon={<CheckCircle fontSize="inherit" />} severity="success" sx={{ borderRadius: 2 }}>
                    Le code est actif et prêt à être utilisé par les formateurs.
                  </Alert>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 900, 
                    color: 'text.disabled', 
                    letterSpacing: 4,
                    my: 2
                  }}>
                    ------
                  </Typography>
                  <Alert icon={<Warning fontSize="inherit" />} severity="info" sx={{ borderRadius: 2 }}>
                    En attente de publication par la Direction Pédagogique.
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)', height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Informations du Partenaire
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #f0f0f0' }}>
                  <Typography color="text.secondary">Statut du partenariat</Typography>
                  <Chip label="ACCREDITÉ" color="primary" size="small" sx={{ fontWeight: 700 }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #f0f0f0' }}>
                  <Typography color="text.secondary">Accès plateforme</Typography>
                  <Typography fontWeight={600}>Illimité</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #f0f0f0' }}>
                  <Typography color="text.secondary">Derniére connexion</Typography>
                  <Typography fontWeight={600}>Aujourd'hui</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
