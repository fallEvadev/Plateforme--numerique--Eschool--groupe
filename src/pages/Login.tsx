import { useState } from 'react'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  InputAdornment, IconButton, Alert
} from '@mui/material'
import { Visibility, VisibilityOff, School } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { loginSuccess } from '../features/auth/authSlice'
import { resolveAuthUserFromSession } from '../features/auth/authUtils'
import { supabase } from '../supabaseClient'
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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        const authUser = resolveAuthUserFromSession(data, null)
        if (authUser) {
          dispatch(loginSuccess({ user: authUser }))
          navigate(`/${authUser.role}`)
        } else {
          setError('Impossible de créer la session utilisateur à partir des informations fournies.')
        }
      }
    } catch (err) {
      setError("Une erreur inattendue est survenue")
    } finally {
      setLoading(false)
    }
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

          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

            <TextField
              label="Email"
              type="email"
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
              sx={{ mt: 2, py: 1.5, fontWeight: 600, borderRadius: 2 }}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}