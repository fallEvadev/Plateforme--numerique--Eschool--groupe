import { useState } from 'react'
import {
  Box, Typography, Card, CardContent, Grid, Paper, Chip, Skeleton
} from '@mui/material'
import { CalendarMonth, Search } from '@mui/icons-material'
import { useGetTimetableQuery } from '../../services/api'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const SUBJECT_COLORS: Record<string, string> = {
  'Mathématiques': '#E3F2FD',
  'Français': '#F3E5F5',
  'Sciences Naturelles': '#E8F5E9',
  'Histoire-Géographie': '#FFF3E0',
  'Physique-Chimie': '#FCE4EC',
  'Arabe': '#E0F7FA',
}

export default function PedagogyTimetable() {
  const { data: timetable, isLoading } = useGetTimetableQuery()
  const [searchTerm, setSearchTerm] = useState('')

  const getEntriesByDay = (day: string) => {
    if (!timetable) return []
    return timetable
      .filter(t => t.day === day)
      .filter(t => 
        t.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.dark' }}>
            Plannings Formateurs
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
             Consultation globale des emplois du temps hebdomadaires.
          </Typography>
        </Box>
        
        <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 0.5, border: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 300 } }}>
           <Search sx={{ color: 'text.secondary', ml: 1 }} />
           <Box component="input" 
                placeholder="Filtrer par prof, classe..." 
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                sx={{ 
                  border: 'none', outline: 'none', px: 1.5, py: 1, width: '100%',
                  fontSize: '0.9rem', color: 'text.primary'
                }} 
           />
        </Box>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>
          {DAYS.map(d => <Grid item xs={12} md={4} key={d}><Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} /></Grid>)}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {DAYS.map(day => {
            const entries = getEntriesByDay(day)
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                <Card sx={{ 
                  height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid #F0F0F0'
                }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{
                      bgcolor: 'primary.light', color: 'primary.dark', borderRadius: 2,
                      px: 2, py: 1, mb: 2, display: 'flex', alignItems: 'center', gap: 1
                    }}>
                      <CalendarMonth fontSize="small" />
                      <Typography fontWeight={800} fontSize="0.95rem">{day}</Typography>
                    </Box>

                    {entries.length === 0 ? (
                      <Box sx={{ py: 4, textAlign: 'center', opacity: 0.5 }}>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>Aucun cours prévu</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {entries.map(entry => (
                          <Paper key={entry.id} sx={{
                            p: 1.5, borderRadius: 2,
                            bgcolor: SUBJECT_COLORS[entry.subject] ?? '#F5F5F5',
                            border: '1px solid rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-2px)' }
                          }} elevation={0}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                               <Typography variant="caption" fontWeight={800} color="primary.dark">
                                 {entry.startTime} – {entry.endTime}
                               </Typography>
                               <Chip label={entry.className} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }} />
                            </Box>
                            <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                              {entry.subject}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}>
                              M. {entry.teacher}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              Salle: {entry.room}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}
