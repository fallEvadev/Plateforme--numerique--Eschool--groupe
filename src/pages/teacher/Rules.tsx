import { Box, Card, CardContent, Typography, Alert, Button } from '@mui/material'
import { Info, Lock } from '@mui/icons-material'
import { useAppSelector } from '../../app/hooks'
// In a real application, isActive would come from the auth token or a /me endpoint inside Redux
// For demo purposes, we will mock it based on the token.

export default function Rules() {
  const { user } = useAppSelector((s) => s.auth)
  
  // Simulated access check: 
  // Suppose active users have id 't1'. Other dummy users are inactive.
  const isAccountActive = user?.id === 't1'

  if (!isAccountActive) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
         <Alert 
           icon={<Lock fontSize="inherit" />} 
           severity="warning" 
           sx={{ borderRadius: 2, '& .MuiAlert-message': { width: '100%' } }}
         >
           <Typography variant="subtitle1" fontWeight={700} gutterBottom>
             Accès Restreint
           </Typography>
           <Typography variant="body2" sx={{ mb: 2 }}>
             Votre compte n'est pas encore activé ou votre contrat est arrivé à terme. Vous ne pouvez pas consulter les documents internes.
           </Typography>
           <Button variant="outlined" color="warning" size="small">Contacter l'administrateur</Button>
         </Alert>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.dark' }}>
        Règlement Intérieur
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
         <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0', bgcolor: '#F5F5F5' }}>
               <Typography variant="subtitle2" color="text.secondary">
                 Dernière mise à jour : 10 Mars 2026
               </Typography>
            </Box>
            
            <Box sx={{ p: 4 }}>
               <Alert icon={<Info />} severity="info" sx={{ mb: 4, borderRadius: 2 }}>
                  Ce document est réservé aux collaborateurs actifs d'E-SCHOOL GROUPE. Toute diffusion est strictement interdite.
               </Alert>

               <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
                 Article 1 : Obligations de présence
               </Typography>
               <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                 Le formateur s'engage à être présent physiquement dans l'établissement au moins 15 minutes avant le début du cours. La validation de présence s'effectue obligatoirement via la plateforme Smart Check-in en utilisant le code d'accès sécurisé.
               </Typography>

               <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
                 Article 2 : Matériel et Maintenance
               </Typography>
               <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                 Tout dysfonctionnement matériel doit être signalé le jour même via le rapport journalier afin de notifier le service de maintenance.
               </Typography>

               <Typography variant="h6" fontWeight={700} gutterBottom color="primary">
                 Article 3 : Devoir de réserve
               </Typography>
               <Typography variant="body1" paragraph color="text.secondary">
                 Les membres de l'équipe pédagogique sont soumis au secret professionnel concernant les données des élèves et des établissements partenaires.
               </Typography>
            </Box>
         </CardContent>
      </Card>
    </Box>
  )
}
