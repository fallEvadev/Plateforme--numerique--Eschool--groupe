import { useState } from 'react'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Tab, Tabs, InputAdornment, IconButton, Alert, Avatar
} from '@mui/material'
import { Visibility, VisibilityOff, School } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { loginSuccess, UserRole } from '../features/auth/authSlice'
import { USERS } from '../users'

import loginBg from '../assets/login_bg.png'

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulation de délai
    await new Promise(r => setTimeout(r, 800))

    const userMatch = USERS.find(u => u.email === email && u.password === password)
    
    if (userMatch) {
      const { password: _, ...userWithoutPassword } = userMatch
      dispatch(loginSuccess({ 
        user: userWithoutPassword, 
        token: 'mock-jwt-token-' + userMatch.role 
      }))
      // Redirection instantanée vers l'espace dédié
      navigate(`/${userMatch.role}`)
    } else {
      setError('Identifiant ou mot de passe incorrect.')
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
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Plateforme de gestion scolaire
            </Typography>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              autoComplete="email"
            />
            <TextField
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 1, py: 1.5, fontSize: '1rem' }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            © 2026 E-SCHOOL GROUPE — Tous droits réservés
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
