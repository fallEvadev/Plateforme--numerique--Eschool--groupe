import {
  Box, Typography, Card, CardContent, Grid, TextField,
  Button, Divider, Switch, FormControlLabel, Avatar
} from '@mui/material'
import { Save, School } from '@mui/icons-material'

export default function AdminSettings() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Paramètres</Typography>
        <Typography variant="body2" color="text.secondary">Configuration de l'établissement</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* School Info */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Informations de l'établissement</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main', borderRadius: 2, fontSize: '2rem' }}>
                      <School fontSize="large" />
                    </Avatar>
                    <Box>
                      <Typography fontWeight={600}>Logo de l'établissement</Typography>
                      <Button size="small" variant="outlined" sx={{ mt: 0.5 }}>Changer le logo</Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nom de l'établissement" defaultValue="E-SCHOOL GROUPE" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Code établissement" defaultValue="ESG-2026" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Wilaya" defaultValue="Alger" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Téléphone" defaultValue="+213 21 XX XX XX" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Adresse" defaultValue="01 Rue de l'Indépendance, Alger Centre" multiline rows={2} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email officiel" defaultValue="contact@eschool.dz" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Site web" defaultValue="www.eschool.dz" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Année scolaire" defaultValue="2025–2026" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Directeur" defaultValue="Mohammed Chérif" />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<Save />}>Enregistrer</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Préférences système</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Notifications par email', defaultChecked: true },
                  { label: 'Alertes de présence automatiques', defaultChecked: true },
                  { label: 'Bulletins en ligne', defaultChecked: false },
                  { label: 'Accès parents aux notes', defaultChecked: true },
                  { label: 'SMS pour absences', defaultChecked: false },
                ].map(pref => (
                  <FormControlLabel
                    key={pref.label}
                    control={<Switch defaultChecked={pref.defaultChecked} color="primary" />}
                    label={<Typography variant="body2">{pref.label}</Typography>}
                    sx={{ m: 0, justifyContent: 'space-between', flexDirection: 'row-reverse' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Trimestres</Typography>
              <Divider sx={{ mb: 2 }} />
              {[
                { label: '1er Trimestre', value: 'Sep – Nov 2025' },
                { label: '2ème Trimestre', value: 'Déc – Fév 2026' },
                { label: '3ème Trimestre', value: 'Mar – Jun 2026' },
              ].map(t => (
                <Box key={t.label} sx={{ mb: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">{t.label}</Typography>
                  <TextField fullWidth size="small" defaultValue={t.value} sx={{ mt: 0.5 }} />
                </Box>
              ))}
              <Button variant="contained" fullWidth sx={{ mt: 1 }} startIcon={<Save />}>Sauvegarder</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
