import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button, TextField, Slider, Avatar, Skeleton
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useState } from 'react'
import { useGetStudentsQuery } from '../../services/api'

function getAppreciation(score: number): string {
  if (score >= 18) return 'Excellent'
  if (score >= 16) return 'Très bien'
  if (score >= 14) return 'Bien'
  if (score >= 12) return 'Assez bien'
  if (score >= 10) return 'Passable'
  return 'Insuffisant'
}

export default function TeacherGrades() {
  const { data: students, isLoading } = useGetStudentsQuery()
  const myStudents = students?.filter(s => s.className === '3ème A') ?? []
  const [grades, setGrades] = useState<Record<string, number>>(() =>
    Object.fromEntries(myStudents.map(s => [s.id, 12]))
  )

  const avg = myStudents.length
    ? (Object.values(grades).reduce((a, b) => a + b, 0) / myStudents.length).toFixed(1)
    : '–'

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4">Saisie des notes</Typography>
          <Typography variant="body2" color="text.secondary">
            Mathématiques • 3ème A • Contrôle N°2 | Moyenne: <strong>{avg}/20</strong>
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Save />}>Enregistrer les notes</Button>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(5)].map((_, i) => <Skeleton key={i} height={60} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Élève</TableCell>
                    <TableCell>Note /20</TableCell>
                    <TableCell width={220}>Ajuster</TableCell>
                    <TableCell>Appréciation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myStudents.map((s, i) => {
                    const score = grades[s.id] ?? 12
                    const appreciation = getAppreciation(score)
                    const color = score >= 14 ? 'success' : score >= 10 ? 'primary' : 'error'
                    return (
                      <TableRow key={s.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.light', fontSize: '0.7rem', fontWeight: 700 }}>
                              {s.avatar}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>{s.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={`${score}/20`} color={color as 'success' | 'primary' | 'error'} sx={{ fontWeight: 700 }} />
                        </TableCell>
                        <TableCell>
                          <Slider
                            value={score}
                            min={0}
                            max={20}
                            step={0.5}
                            size="small"
                            valueLabelDisplay="auto"
                            onChange={(_, v) => setGrades(prev => ({ ...prev, [s.id]: v as number }))}
                            sx={{ color: color === 'success' ? 'success.main' : color === 'error' ? 'error.main' : 'primary.main' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">{appreciation}</Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
