import {
  Box, Typography, Card, CardContent, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Grid
} from '@mui/material'
import { useGetGradesByStudentQuery } from '../../services/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ParentGrades() {
  const { data: grades, isLoading } = useGetGradesByStudentQuery('s1')

  const chartData = grades?.map(g => ({
    subject: g.subject.split(' ')[0],
    note: +(g.score / g.maxScore * 20).toFixed(1),
  })) ?? []

  const avg = grades?.length
    ? (grades.reduce((s, g) => s + (g.score / g.maxScore) * 20, 0) / grades.length).toFixed(1)
    : '–'

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Notes de mon enfant</Typography>
        <Typography variant="body2" color="text.secondary">
          Amina Benali — 3ème A — Moyenne: <strong>{avg}/20</strong>
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Résultats par matière</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis type="number" domain={[0, 20]} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="subject" type="category" tick={{ fontSize: 12 }} width={60} />
                  <Tooltip formatter={(v) => [`${v}/20`, 'Note']} />
                  <Bar dataKey="note" fill="#1565C0" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Bulletin de notes détaillé</Typography>
              {isLoading ? <Typography>Chargement…</Typography> : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Matière</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Appréciation</TableCell>
                        <TableCell>Enseignant</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(grades ?? []).map(g => (
                        <TableRow key={g.id} hover>
                          <TableCell><Typography fontWeight={500} variant="body2">{g.subject}</Typography></TableCell>
                          <TableCell>
                            <Chip
                              label={`${g.score}/${g.maxScore}`}
                              size="small"
                              color={g.score / g.maxScore >= 0.7 ? 'success' : g.score / g.maxScore >= 0.5 ? 'primary' : 'error'}
                              sx={{ fontWeight: 700 }}
                            />
                          </TableCell>
                          <TableCell><Typography variant="caption" color="text.secondary">{g.appreciation}</Typography></TableCell>
                          <TableCell><Typography variant="caption">{g.teacherName}</Typography></TableCell>
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
