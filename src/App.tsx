import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import Login from './pages/Login'
import MainLayout from './components/layout/MainLayout'

// Shared Placeholder
import Placeholder from './pages/Placeholder'

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import Recruitment from './pages/admin/Recruitment'
import Contracts from './pages/admin/Contracts'
import Reports from './pages/admin/Reports'
import Resources from './pages/admin/Resources'
import PedagogyTimetable from './pages/admin/PedagogyTimetable'
import AdminUsers from './pages/admin/Users'

// Teacher pages
import TeacherDashboard from './pages/teacher/Dashboard'
import TeacherTimetable from './pages/teacher/Timetable'
import DailyReport from './pages/teacher/DailyReport'
import Rules from './pages/teacher/Rules'
import Program from './pages/teacher/Program'

// Maintenance pages
import IssueList from './pages/maintenance/IssueList'

// Ecole pages
import SchoolDashboard from './pages/ecole/Dashboard'
import ForgotPassword from './pages/ForgotPassword'

function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? `/${user?.role}` : '/login'} replace />} />

        {/* Directeur routes */}
        <Route path="/directeur" element={<ProtectedRoute allowedRoles={['directeur']}><MainLayout role="directeur" /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        {/* Pédagogie routes */}
        <Route path="/pedagogie" element={<ProtectedRoute allowedRoles={['pedagogie']}><MainLayout role="pedagogie" /></ProtectedRoute>}>
          <Route index element={<Navigate to="reports" replace />} />
          <Route path="trainers" element={<PedagogyTimetable />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* DRH routes */}
        <Route path="/drh" element={<ProtectedRoute allowedRoles={['drh']}><MainLayout role="drh" /></ProtectedRoute>}>
          <Route index element={<Navigate to="recruitment" replace />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="contracts" element={<Contracts />} />
        </Route>

        {/* Gestionnaire routes */}
        <Route path="/gestionnaire" element={<ProtectedRoute allowedRoles={['gestionnaire']}><MainLayout role="gestionnaire" /></ProtectedRoute>}>
          <Route index element={<Navigate to="maintenance" replace />} />
          <Route path="maintenance" element={<IssueList />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* Teacher routes */}
        <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><MainLayout role="teacher" /></ProtectedRoute>}>
          <Route index element={<Navigate to="planning" replace />} />
          <Route path="planning" element={<TeacherTimetable />} />
          <Route path="report" element={<DailyReport />} />
          <Route path="rules" element={<Rules />} />
          <Route path="program" element={<Program />} />
        </Route>

        {/* Ecole routes */}
        <Route path="/ecole" element={<ProtectedRoute allowedRoles={['ecole']}><MainLayout role="ecole" /></ProtectedRoute>}>
          <Route index element={<SchoolDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
