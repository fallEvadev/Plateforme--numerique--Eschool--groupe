import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mapSupabaseRole } from './authUtils'

export type UserRole = 'directeur' | 'pedagogie' | 'drh' | 'gestionnaire' | 'teacher' | 'ecole'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  className?: string // for teacher
  childName?: string // for parent
}

export { mapSupabaseRole } from './authUtils'

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
  isCodePublished: boolean
  reports: Report[]
  isInitialized: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  dailyPedagogicalCode: null,
  codeGeneratedAt: null,
  isCodePublished: false,
  reports: [],
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: AuthUser }>) {
      state.user = action.payload.user
      state.isAuthenticated = true
      state.isInitialized = true
    },
    setInitialized(state) {
      state.isInitialized = true
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    setDailyCode(state, action: PayloadAction<string>) {
      state.dailyPedagogicalCode = action.payload
      state.codeGeneratedAt = new Date().toISOString()
      state.isCodePublished = false // Reset published flag on new code
    },
    publishCode(state) {
      state.isCodePublished = true
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

export const { 
  loginSuccess, logout, setDailyCode, publishCode, addReport, updateReportStatus, editReport, setInitialized
} = authSlice.actions
export default authSlice.reducer
