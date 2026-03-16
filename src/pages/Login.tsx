import { useState } from 'react'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Tab, Tabs, InputAdornment, IconButton, Alert, Avatar
} from '@mui/material'
import { Visibility, VisibilityOff, School } from '@mui/icons-material'
import { useAppDispatch } from '../app/hooks'
import { loginSuccess, UserRole, AuthUser } from '../features/auth/authSlice'

interface DemoAccount {
  role: UserRole
  label: string
  username: string
  password: string
  user: AuthUser
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'directeur',
    label: 'Directeur Général',
    username: 'm.camara',
    password: 'password123',
    user: { id: 'd1', name: 'M. Camara', email: 'direction@eschool.dz', role: 'directeur' },
  },
  {
    role: 'pedagogie',
    label: 'Dir. Pédagogie',
    username: 'm.lo',
    password: 'password123',
    user: { id: 'p1', name: 'M. Lô', email: 'pedagogie@eschool.dz', role: 'pedagogie' },
  },
  {
    role: 'drh',
    label: 'DRH',
    username: 'mme.faye',
    password: 'password123',
    user: { id: 'drh1', name: 'Mme Faye', email: 'rh@eschool.dz', role: 'drh' },
  },
  {
    role: 'gestionnaire',
    label: 'Gestionnaire',
    username: 'm.ndiaye',
    password: 'password123',
    user: { id: 'g1', name: 'M. Ndiaye', email: 'gestion@eschool.dz', role: 'gestionnaire' },
  },
  {
    role: 'teacher',
    label: 'Formateur',
    username: 'prof.fall',
    password: 'password123',
    user: { id: 't1', name: 'Prof. Fall', email: 'prof.fall@eschool.dz', role: 'teacher', className: '3ème A' },
  },
]

const roleColors: Record<UserRole, string> = {
  directeur: '#1565C0',
  pedagogie: '#1976D2',
  drh: '#1E88E5',
  gestionnaire: '#42A5F5',
  teacher: '#1976D2',
}

export default function Login() {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState(0)
  const [username, setUsername] = useState(DEMO_ACCOUNTS[0].username)
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0].password)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const activeAccount = DEMO_ACCOUNTS[activeTab]

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    setUsername(DEMO_ACCOUNTS[newValue].username)
    setPassword(DEMO_ACCOUNTS[newValue].password)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const match = DEMO_ACCOUNTS.find(a => a.username === username && a.password === password)
    if (match) {
      dispatch(loginSuccess({ user: match.user, token: 'mock-jwt-token-' + match.role }))
    } else {
      setError('Identifiant ou mot de passe incorrect.')
    }
    setLoading(false)
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #1E88E5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      position: 'relative',
      overflow: 'hidden',
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
        }} />
      ))}

      <Card sx={{ width: '100%', maxWidth: 480, borderRadius: 3, boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
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

          {/* Role Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mb: 3,
              '& .MuiTab-root': { fontSize: '0.75rem', fontWeight: 600, minHeight: 40 },
              '& .MuiTabs-indicator': { height: 3, borderRadius: 2 },
            }}
          >
            {DEMO_ACCOUNTS.map((acc) => (
              <Tab key={acc.role} label={acc.label} />
            ))}
          </Tabs>

          {/* Demo Account Info */}
          <Box sx={{
            p: 1.5, mb: 2, borderRadius: 2,
            background: '#EBF3FF', border: '1px solid #BBDEFB',
            display: 'flex', alignItems: 'center', gap: 1.5,
          }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: roleColors[activeAccount.role], fontSize: '0.8rem', fontWeight: 700 }}>
              {activeAccount.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </Avatar>
            <Box>
              <Typography variant="caption" color="primary" sx={{ fontWeight: 700, display: 'block' }}>
                Compte démo : {activeAccount.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Mot de passe: {activeAccount.password}
              </Typography>
            </Box>
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}
            <TextField
              label="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              autoComplete="username"
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
