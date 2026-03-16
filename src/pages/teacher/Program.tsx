import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { CheckBox, CheckBoxOutlineBlank, Campaign } from '@mui/icons-material'

const MONTHLY_GOALS = [
  { id: 1, title: 'Terminer le chapitre 4 : Les bases de données relationnelles', done: true },
  { id: 2, title: 'Faire passer le premier examen d\'évaluation continue', done: false },
  { id: 3, title: 'S\'assurer que les absences sont signalées le jour même', done: false },
  { id: 4, title: 'Organiser une séance de rattrapage pour les retardataires', done: false },
]

export default function Program() {
  return (
    <Box sx={{ p: 4, maxWidth: 800 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
           <Campaign sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Box>
           <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
             Programme Mensuel
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Objectifs du mois (Mars 2026) fixés par la Direction Pédagogique.
           </Typography>
        </Box>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <CardContent>
          <List>
            {MONTHLY_GOALS.map((goal, index) => (
              <Box key={goal.id}>
                <ListItem sx={{ py: 2 }}>
                  <ListItemIcon>
                    {goal.done ? <CheckBox color="success" /> : <CheckBoxOutlineBlank color="action" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={goal.title} 
                    primaryTypographyProps={{ 
                      fontWeight: goal.done ? 400 : 500,
                      color: goal.done ? 'text.secondary' : 'text.primary',
                      sx: { textDecoration: goal.done ? 'line-through' : 'none' }
                    }} 
                  />
                </ListItem>
                {index < MONTHLY_GOALS.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}
