import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Grid
} from '@mui/material'
import { useGetGradesByStudentQuery } from '../../services/api'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = (score / max) * 100
  const color = pct >= 80 ? 'success' : pct >= 60 ? 'primary' : pct >= 50 ? 'warning' : 'error'
  return <Chip label={`${score}/${max}`} size="small" color={color as any} sx={{ fontWeight: 700 }} />
}

export default function StudentGrades() {
  const { data: grades, isLoading } = useGetGradesByStudentQuery('s1')

  const radarData = grades?.map(g => ({
    subject: g.subject.split(' ')[0],
    note: +(g.score / g.maxScore * 20).toFixed(1),
  })) ?? []

  const avg = grades?.length
    ? (grades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1)
    : '–'

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Mes notes</Typography>
        <Typography variant="body2" color="text.secondary">
          Trimestre 2 — Moyenne générale: <strong>{avg}/20</strong>
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Radar des matières</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="Note/20" dataKey="note" stroke="#1565C0" fill="#1565C0" fillOpacity={0.25} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Relevé de notes détaillé</Typography>
              {isLoading ? (
                <Typography>Chargement…</Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Matière</TableCell>
                        <TableCell>Examen</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Coef.</TableCell>
                        <TableCell>Appréciation</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(grades ?? []).map(g => (
                        <TableRow key={g.id} hover>
                          <TableCell><Typography fontWeight={500} variant="body2">{g.subject}</Typography></TableCell>
                          <TableCell><Typography variant="caption">{g.examTitle}</Typography></TableCell>
                          <TableCell><ScoreBadge score={g.score} max={g.maxScore} /></TableCell>
                          <TableCell><Chip label={`×${g.coefficient}`} size="small" variant="outlined" /></TableCell>
                          <TableCell><Typography variant="caption" color="text.secondary">{g.appreciation}</Typography></TableCell>
                          <TableCell><Typography variant="caption">{new Date(g.date).toLocaleDateString('fr-DZ')}</Typography></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
