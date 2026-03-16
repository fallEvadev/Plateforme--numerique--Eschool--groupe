import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material'
import { Folder } from '@mui/icons-material'

const RESOURCES = [
  { id: 1, title: 'Règlement Intérieur E-SCHOOL', files: 3 },
  { id: 2, title: 'Documents Administratifs', files: 12 },
  { id: 3, title: 'Modèles de Contrats', files: 4 },
  { id: 4, title: 'Guides Formateurs', files: 7 },
  { id: 5, title: 'Chartes Graphiques & Logos', files: 5 },
]

export default function Resources() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.dark' }}>
        Ressources Partagées
      </Typography>
      
      <Grid container spacing={3}>
        {RESOURCES.map((r) => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <Card sx={{ borderRadius: 3, cursor: 'pointer', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Folder sx={{ fontSize: 64, color: '#FFB300', mb: 2 }} />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {r.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {r.files} fichier(s)
                </Typography>
                <Button variant="outlined" sx={{ mt: 3, borderRadius: 2 }}>
                  Ouvrir le dossier
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
