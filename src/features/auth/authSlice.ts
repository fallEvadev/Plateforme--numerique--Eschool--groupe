import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'directeur' | 'pedagogie' | 'drh' | 'gestionnaire' | 'teacher'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  className?: string // for teacher
}

interface Report {
  id: string
  formateur: string
  school: string
  date: string
  startTime: string
  endTime: string
  subject: string
  className: string
  content: string
  status: 'valide' | 'en_attente' | 'a_modifier'
  hardware?: string
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  dailyPedagogicalCode: string | null
  codeGeneratedAt: string | null
  reports: Report[]
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  dailyPedagogicalCode: null,
  codeGeneratedAt: null,
  reports: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    setDailyCode(state, action: PayloadAction<string>) {
      state.dailyPedagogicalCode = action.payload
      state.codeGeneratedAt = new Date().toISOString()
    },
    addReport(state, action: PayloadAction<Report>) {
      state.reports = [action.payload, ...state.reports]
    },
    editReport(state, action: PayloadAction<Report>) {
      const index = state.reports.findIndex(r => r.id === action.payload.id)
      if (index !== -1) {
        state.reports[index] = action.payload
      }
    },
    updateReportStatus(state, action: PayloadAction<{ id: string; status: Report['status'] }>) {
      const report = state.reports.find(r => r.id === action.payload.id)
      if (report) {
        report.status = action.payload.status
      }
    }
  },
})

export const { loginSuccess, logout, setDailyCode, addReport, updateReportStatus, editReport } = authSlice.actions
export default authSlice.reducer
