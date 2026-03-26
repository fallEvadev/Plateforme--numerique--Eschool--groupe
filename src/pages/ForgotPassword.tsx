import { useState } from 'react'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert
} from '@mui/material'
import { School, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import loginBg from '../assets/login_bg.png'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Simulation de délai
    await new Promise(r => setTimeout(r, 1500))

    if (email.includes('@')) {
      setSuccess('Si ce compte existe, un lien de récupération a été envoyé à ' + email)
    } else {
      setError('Veuillez entrer une adresse email valide.')
    }
    setLoading(false)
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundImage: `url(${loginBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        bgcolor: 'rgba(0, 30, 60, 0.7)',
        zIndex: 1,
      }
    }}>
      {/* Background decoration */}
      {[...Array(4)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          width: [300, 200, 150, 100][i],
          height: [300, 200, 150, 100][i],
          top: ['10%', '60%', '20%', '70%'][i],
          left: ['70%', '5%', '80%', '50%'][i],
          zIndex: 1,
        }} />
      ))}

      <Card sx={{ 
        width: '100%', 
        maxWidth: 480, 
        borderRadius: 3, 
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 2 
      }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{
              width: 70, height: 70, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1565C0, #1E88E5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', mb: 2, boxShadow: '0 8px 24px rgba(21,101,192,0.4)',
            }}>
              <School sx={{ color: 'white', fontSize: 36 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark', letterSpacing: '-0.5px' }}>
              E-SCHOOL GROUPE
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, color: 'text.primary' }}>
              Mot de passe oublié ?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Entrez votre email pour recevoir un lien de récupération
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ borderRadius: 2 }}>{success}</Alert>}
            
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={!!success}
              autoComplete="email"
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !!success}
              sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600 }}
            >
              {loading ? 'Envoi...' : 'Envoyer le lien de récupération'}
            </Button>

            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/login')}
              sx={{ color: 'text.secondary', mt: 1, fontWeight: 500 }}
            >
              Retour à la connexion
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 4 }}>
            © 2026 E-SCHOOL GROUPE — Tous droits réservés
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
