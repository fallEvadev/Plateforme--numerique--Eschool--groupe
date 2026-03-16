import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const DRAWER_WIDTH = 260

interface MainLayoutProps {
  role: string
}

export default function MainLayout({ role }: MainLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        role={role}
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: { md: `${DRAWER_WIDTH}px` } }}>
        <Topbar drawerWidth={DRAWER_WIDTH} onMenuToggle={() => setMobileOpen(true)} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, mt: '64px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
