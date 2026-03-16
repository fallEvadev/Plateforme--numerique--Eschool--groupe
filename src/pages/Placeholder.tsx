import { Box, Typography } from '@mui/material'

export default function Placeholder({ title }: { title: string }) {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>{title}</Typography>
      <Typography color="text.secondary">Page en cours de construction...</Typography>
    </Box>
  )
}
