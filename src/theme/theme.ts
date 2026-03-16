import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
      light: '#1E88E5',
      dark: '#0D47A1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#546E7A',
      light: '#78909C',
      dark: '#37474F',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F4F6F9',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#1A2332',
      secondary: '#546E7A',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700, fontSize: '2.25rem' },
    h2: { fontWeight: 700, fontSize: '1.875rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.125rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    subtitle1: { fontWeight: 500, fontSize: '0.875rem' },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.8125rem' },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0,0,0,0.06)',
    '0px 4px 16px rgba(0,0,0,0.08)',
    '0px 6px 20px rgba(0,0,0,0.10)',
    '0px 8px 24px rgba(0,0,0,0.12)',
    '0px 10px 28px rgba(0,0,0,0.14)',
    ...Array(19).fill('0px 10px 28px rgba(0,0,0,0.14)') as string[],
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: '0px 4px 12px rgba(21,101,192,0.3)' },
        },
        contained: {
          background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
          border: '1px solid #F0F0F0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 500 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#EBF3FF',
            color: '#1565C0',
            fontWeight: 600,
            fontSize: '0.8125rem',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          '&.Mui-selected': {
            backgroundColor: '#EBF3FF',
            color: '#1565C0',
            '& .MuiListItemIcon-root': { color: '#1565C0' },
            '&:hover': { backgroundColor: '#DCEEFB' },
          },
          '&:hover': { backgroundColor: '#F0F7FF' },
        },
      },
    },
  },
})
