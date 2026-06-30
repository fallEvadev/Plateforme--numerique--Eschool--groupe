import { USERS } from './users'

const STORAGE_KEY = 'eschool-local-session'
const AUTH_EVENT = 'eschool-local-auth-change'

function getStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function persistSession(session: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event(AUTH_EVENT))
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

const auth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = USERS.find(
      (candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password,
    )

    if (!user) {
      return {
        data: { user: null, session: null },
        error: { message: 'Email ou mot de passe incorrect.' },
      }
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      user_metadata: { full_name: user.name, role: user.role },
      app_metadata: { role: user.role },
    }

    const session = { access_token: 'local-dev-token', user: sessionUser }
    persistSession(session)

    return { data: { user: sessionUser, session }, error: null }
  },

  async signOut() {
    clearSession()
    return { error: null }
  },

  async getSession() {
    return { data: { session: getStoredSession() }, error: null }
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    const handleChange = () => {
      const session = getStoredSession()
      callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session)
    }

    handleChange()

    window.addEventListener(AUTH_EVENT, handleChange as EventListener)

    return {
      data: {
        subscription: {
          unsubscribe() {
            window.removeEventListener(AUTH_EVENT, handleChange as EventListener)
          },
        },
      },
    }
  },
}

export const supabase = { auth } as any