import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Skeleton, Avatar
} from '@mui/material'
import { useGetGradesQuery } from '../../services/api'

function ScoreChip({ score, max }: { score: number; max: number }) {
  const pct = (score / max) * 100
  const color = pct >= 80 ? 'success' : pct >= 60 ? 'primary' : pct >= 50 ? 'warning' : 'error'
  return (
    <Chip
      label={`${score}/${max}`}
      size="small"
      color={color as 'success' | 'primary' | 'warning' | 'error'}
      sx={{ fontWeight: 700 }}
    />
  )
}

export default function AdminGrades() {
  const { data: grades, isLoading } = useGetGradesQuery()

  const avg = grades ? (grades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1) : '–'

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Notes & Résultats</Typography>
        <Typography variant="body2" color="text.secondary">
          {grades?.length ?? 0} notes enregistrées — Moyenne générale: <strong>{avg}/20</strong>
        </Typography>
      </Box>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box>{[...Array(8)].map((_, i) => <Skeleton key={i} height={52} sx={{ mb: 0.5 }} />)}</Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Élève</TableCell>
                    <TableCell>Classe</TableCell>
                    <TableCell>Matière</TableCell>
                    <TableCell>Examen</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Coef.</TableCell>
                    <TableCell>Appréciation</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Formateur</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(grades ?? []).map(g => (
                    <TableRow key={g.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.light', fontSize: '0.7rem', fontWeight: 700 }}>
                            {g.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>{g.studentName}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Chip label={g.className} size="small" color="primary" variant="outlined" /></TableCell>
                      <TableCell>{g.subject}</TableCell>
                      <TableCell><Typography variant="caption">{g.examTitle}</Typography></TableCell>
                      <TableCell><ScoreChip score={g.score} max={g.maxScore} /></TableCell>
                      <TableCell>
                        <Chip label={`×${g.coefficient}`} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">{g.appreciation}</Typography>
                      </TableCell>
                      <TableCell>{new Date(g.date).toLocaleDateString('fr-DZ')}</TableCell>
                      <TableCell><Typography variant="caption">{g.teacherName}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
