import React, { useState } from 'react'
import { 
  Box, Card, CardContent, Typography, TextField, Button, 
  Alert, InputAdornment, Grid 
} from '@mui/material'
import { Lock, Key, CheckCircleOutline } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addReport } from '../../features/auth/authSlice'

export default function DailyReport() {
  const dispatch = useAppDispatch()
  const { dailyPedagogicalCode, codeGeneratedAt, user } = useAppSelector(s => s.auth)
  
  const [inputCode, setInputCode] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [codeError, setCodeError] = useState("")
  
  const [subject, setSubject] = useState("")
  const [className, setClassName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [content, setContent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  // Date du jour statique formatée
  const todayDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const isoDate = new Date().toISOString().split('T')[0]

  const handleUnlock = () => {
    setCodeError("")
    
    // Sécurité : Vérifier si le code du jour existe
    if (!dailyPedagogicalCode) {
      setCodeError("Aucun code n'a été généré par la direction pour aujourd'hui.")
      return
    }

    // Protection contre les valeurs vides ou undefined avant comparaison
    const targetCode = dailyPedagogicalCode || ""
    const typedCode = inputCode || ""

    if (!typedCode) {
      setCodeError("Veuillez saisir le code.")
      return
    }

    // Check expiration (24h) si codeGeneratedAt existe
    if (codeGeneratedAt) {
      const genTime = new Date(codeGeneratedAt).getTime()
      const now = new Date().getTime()
      const diffHours = (now - genTime) / (1000 * 60 * 60)

      if (diffHours > 24) {
        setCodeError("Code expiré. Veuillez récupérer le nouveau code auprès de la direction.")
        return
      }
    }

    const normalizedInput = typedCode.replace(/\s/g, '').toUpperCase()
    const normalizedTarget = targetCode.replace(/\s/g, '').toUpperCase()

    if (normalizedInput === normalizedTarget) {
      setIsUnlocked(true)
    } else {
      setCodeError("Code d'accès incorrect.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newReport = {
      id: 'RPT-' + Math.floor(Math.random() * 10000),
      formateur: user?.name || 'Prof. Fall',
      school: 'E-School Groupe',
      date: isoDate,
      startTime,
      endTime,
      subject,
      className,
      content,
      status: 'en_attente' as const,
      hardware: 'Parfait'
    }

    dispatch(addReport(newReport))
    setSubmitted(true)
    
    // Réinitialisation après 4 secondes
    setTimeout(() => {
      setSubject("")
      setClassName("")
      setStartTime("")
      setEndTime("")
      setContent("")
      setSubmitted(false)
      setIsUnlocked(false)
      setInputCode("")
    }, 4000)
  }

  if (submitted) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Alert icon={<CheckCircleOutline fontSize="inherit" />} severity="success" sx={{ borderRadius: 2, py: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>Votre rapport a été transmis avec succès à la Direction Pédagogique.</Typography>
              <Typography variant="body2">Vous pouvez maintenant fermer cette page ou en rédiger un nouveau.</Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    )
  }

  if (!isUnlocked) {
    return (
      <Box sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
        <Card sx={{ borderRadius: 3, textAlign: 'center', p: 4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}>
          <Box sx={{ 
            width: 80, height: 80, bgcolor: 'primary.light', borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 
          }}>
            <Lock sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>Accès au Rapport</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Veuillez saisir le code de validation du Directeur Partenaire pour remplir votre rapport.
          </Typography>
          
          {codeError && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{codeError}</Alert>}
          
          <TextField
            fullWidth
            label="Code d'accès Pédagogique"
            variant="outlined"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            placeholder="Ex: 809356"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Key /></InputAdornment>,
            }}
            sx={{ mb: 3 }}
          />
          
          <Button 
            fullWidth 
            variant="contained" 
            size="large" 
            onClick={handleUnlock}
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            Débloquer le formulaire
          </Button>
        </Card>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.dark' }}>
        Rapport Journalier
      </Typography>
      
      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              Détails de la séance
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Date du jour"
                  value={todayDate}
                  fullWidth
                  disabled
                  sx={{ bgcolor: '#F5F5F5' }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Matière"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  fullWidth
                  required
                  placeholder="Ex: Mathématiques"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Classe"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  fullWidth
                  required
                  placeholder="Ex: 3ème A"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Heure de début"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Heure de fin"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Contenu du cours"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  placeholder="Décrivez les chapitres abordés..."
                />
              </Grid>
            </Grid>

            <Button 
              type="submit" 
              variant="contained" 
              size="large" 
              sx={{ mt: 2, py: 1.5, fontSize: '1.05rem', borderRadius: 2 }}
            >
              Envoyer le rapport
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
