import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Avatar, Chip, Button
} from '@mui/material'
import {
  Dashboard, People, Class, MenuBook, CalendarMonth, Assignment,
  Grade, HowToReg, Campaign, Settings, Logout
} from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { logout } from '../../features/auth/authSlice'

const DRAWER_WIDTH = 260

interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  directeur: [
    { label: 'Vue d\'ensemble', icon: <Dashboard />, path: '/directeur' },
    { label: 'Utilisateurs', icon: <People />, path: '/directeur/users' },
  ],
  pedagogie: [
    { label: 'Gestion des rapports', icon: <Assignment />, path: '/pedagogie/reports' },
    { label: 'Plannings', icon: <CalendarMonth />, path: '/pedagogie/trainers' },
  ],
  drh: [
    { label: 'Recrutement', icon: <People />, path: '/drh/recruitment' },
    { label: 'Personnel', icon: <MenuBook />, path: '/drh/contracts' },
  ],
  gestionnaire: [
    { label: 'Maintenance', icon: <Dashboard />, path: '/gestionnaire/maintenance' },
    { label: 'Ressources', icon: <Settings />, path: '/gestionnaire/resources' },
  ],
  teacher: [
    { label: 'Planning', icon: <CalendarMonth />, path: '/teacher/planning' },
    { label: 'Rapport Journalier', icon: <Assignment />, path: '/teacher/report' },
    { label: 'Règlement intérieur', icon: <MenuBook />, path: '/teacher/rules' },
    { label: 'Programme mensuel', icon: <Campaign />, path: '/teacher/program' },
  ],
  ecole: [
    { label: 'Tableau de bord', icon: <Dashboard />, path: '/ecole' },
  ],
}

const roleLabels: Record<string, string> = {
  directeur: 'M. Camara (DG)',
  pedagogie: 'M. Lô (Pédagogie)',
  drh: 'Mme Faye (DRH)',
  gestionnaire: 'M. Ndiaye (Gestion)',
  teacher: 'Formateur',
  ecole: 'Ecole Partenaire',
}

interface SidebarProps {
  role: string
  drawerWidth: number
  mobileOpen: boolean
  onMobileClose: () => void
}

function SidebarContent({ role }: { role: string }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { user, reports = [] } = useAppSelector((s) => s.auth)
  
  const navItems = NAV_ITEMS[role] || []
  const roleLabel = roleLabels[role] || 'Utilisateur'

  const pendingReportsCount = (reports || []).filter(r => r?.status === 'en_attente').length

  const isActive = (path: string) => {
    if (path === `/${role}`) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF' }}>
      {/* Logo */}
      <Box sx={{
        px: 2, py: 2.5,
        background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
        display: 'flex', alignItems: 'center', gap: 1.5
      }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>E</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>
            E-SCHOOL
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: 1 }}>
            GROUPE
          </Typography>
        </Box>
      </Box>

      {/* User Info */}
      <Box sx={{ px: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{
            width: 42, height: 42, bgcolor: 'primary.main',
            fontWeight: 700, fontSize: '0.9rem'
          }}>
            {getInitials(user?.name)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.3 }} noWrap>
              {user?.name || 'Utilisateur'}
            </Typography>
            <Chip
              label={roleLabel}
              size="small"
              color="primary"
              sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, mt: 0.3 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Nav Items */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 1, py: 1 }}>
        <List dense disablePadding>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={{ mb: 0.5, borderRadius: 1 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: isActive(item.path) ? 'primary.main' : 'grey.500' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: '0.83rem', fontWeight: isActive(item.path) ? 600 : 400 }}
              />
              {item.label === 'Gestion des rapports' && role === 'pedagogie' && pendingReportsCount > 0 && (
                <Box sx={{
                  bgcolor: 'error.main', color: 'white', borderRadius: '50%',
                  width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 700
                }}>
                  {pendingReportsCount}
                </Box>
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          fullWidth 
          variant="outlined" 
          color="error" 
          startIcon={<Logout />} 
          onClick={() => {
            dispatch(logout())
            navigate('/login')
          }}
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Déconnexion
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          © 2026 E-SCHOOL GROUPE
        </Typography>
      </Box>
    </Box>
  )
}

export default function Sidebar({ role, drawerWidth, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SidebarContent role={role} />
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth, boxSizing: 'border-box',
            borderRight: '1px solid', borderColor: 'divider',
          },
        }}
        open
      >
        <SidebarContent role={role} />
      </Drawer>
    </Box>
  )
}
