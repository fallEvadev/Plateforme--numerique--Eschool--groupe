import { useState } from 'react'
import {
  Box, Typography, Card, CardContent, Grid, Paper, Chip, Button, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useGetTimetableQuery } from '../../services/api'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Samedi', 'Dimanche']
const SUBJECT_COLORS: Record<string, string> = {
  'Mathématiques': '#E3F2FD',
  'Français': '#F3E5F5',
  'Sciences Naturelles': '#E8F5E9',
  'Histoire-Géographie': '#FFF3E0',
  'Physique-Chimie': '#FCE4EC',
  'Arabe': '#E0F7FA',
}

export default function AdminTimetable() {
  const { data: timetable, isLoading } = useGetTimetableQuery()
  const [localEntries, setLocalEntries] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  
  const [newEntry, setNewEntry] = useState({
    day: 'Dimanche', startTime: '', endTime: '', subject: 'Mathématiques', className: '', room: '', teacher: ''
  })

  const handleAdd = () => {
    if (newEntry.startTime && newEntry.endTime) {
      setLocalEntries([...localEntries, { id: 'local-' + Date.now().toString(), ...newEntry }])
      setOpen(false)
      setNewEntry({ day: 'Dimanche', startTime: '', endTime: '', subject: 'Mathématiques', className: '', room: '', teacher: '' })
    }
  }

  const getEntriesByDay = (day: string) => {
    const combined = [...(timetable ?? []), ...localEntries]
    return combined.filter(t => t.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Emploi du temps</Typography>
          <Typography variant="body2" color="text.secondary">Planning hebdomadaire par classe</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Ajouter un créneau</Button>
      </Box>

      {isLoading ? (
        <Grid container spacing={2}>
          {DAYS.map(d => <Grid item xs={12} md={4} key={d}><Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} /></Grid>)}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {DAYS.map(day => {
            const entries = getEntriesByDay(day)
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={day}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{
                      bgcolor: 'primary.main', color: 'white', borderRadius: 1.5,
                      px: 1.5, py: 0.75, mb: 1.5, textAlign: 'center',
                    }}>
                      <Typography fontWeight={700} fontSize="0.9rem">{day}</Typography>
                    </Box>
                    {entries.length === 0 ? (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', py: 2 }}>
                        Aucun cours
                      </Typography>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {entries.map(entry => (
                          <Paper key={entry.id} sx={{
                            p: 1.25, borderRadius: 1.5,
                            bgcolor: SUBJECT_COLORS[entry.subject] ?? '#F5F5F5',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}>
                            <Typography variant="caption" fontWeight={700} color="primary.dark" sx={{ display: 'block' }}>
                              {entry.startTime} – {entry.endTime}
                            </Typography>
                            <Typography variant="body2" fontWeight={600} sx={{ mt: 0.25 }}>
                              {entry.subject}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {entry.className} • {entry.room}
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

      {/* Legend */}
      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {Object.entries(SUBJECT_COLORS).map(([sub, color]) => (
          <Chip key={sub} label={sub} size="small" sx={{ bgcolor: color, fontWeight: 500 }} />
        ))}
      </Box>

      {/* Add Slot Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter un nouveau créneau</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField select label="Jour" value={newEntry.day} onChange={e => setNewEntry({ ...newEntry, day: e.target.value })} fullWidth>
            {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          <Box sx={{ display: 'flex', gap: 2 }}>
             <TextField type="time" label="Heure de début" value={newEntry.startTime} onChange={e => setNewEntry({ ...newEntry, startTime: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} required />
             <TextField type="time" label="Heure de fin" value={newEntry.endTime} onChange={e => setNewEntry({ ...newEntry, endTime: e.target.value })} fullWidth InputLabelProps={{ shrink: true }} required />
          </Box>
          <TextField select label="Matière" value={newEntry.subject} onChange={e => setNewEntry({ ...newEntry, subject: e.target.value })} fullWidth>
            {Object.keys(SUBJECT_COLORS).map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>
          <TextField label="Classe" value={newEntry.className} onChange={e => setNewEntry({ ...newEntry, className: e.target.value })} fullWidth placeholder="Ex: 3ème A" />
          <TextField label="Salle" value={newEntry.room} onChange={e => setNewEntry({ ...newEntry, room: e.target.value })} fullWidth placeholder="Ex: Salle 101" />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleAdd}>Enregistrer le créneau</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
