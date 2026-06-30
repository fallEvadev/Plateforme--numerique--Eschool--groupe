import type { AuthUser, UserRole } from './authSlice'

export const roleMap: Record<string, UserRole> = {
  admin: 'directeur',
  directeur: 'directeur',
  'pédago': 'pedagogie',
  pedagogie: 'pedagogie',
  drh: 'drh',
  'drh': 'drh',
  maintenancier: 'gestionnaire',
  gestionnaire: 'gestionnaire',
  formateur: 'teacher',
  teacher: 'teacher',
  enseignant: 'teacher',
  professeur: 'teacher',
  prof: 'teacher',
  trainer: 'teacher',
  ecole: 'ecole',
  student: 'ecole',
  eleve: 'ecole',
  élève: 'ecole',
  parent: 'ecole',
  parents: 'ecole',
}

export function mapSupabaseRole(role?: string | null): UserRole {
  if (!role) return 'ecole'

  const normalized = role.trim().toLowerCase()
  if (roleMap[normalized]) return roleMap[normalized]

  const simplified = normalized.replace(/[^a-z]/g, '')
  if (roleMap[simplified]) return roleMap[simplified]

  return 'ecole'
}

export function inferRoleFromEmail(email?: string | null): UserRole | null {
  const normalized = email?.trim().toLowerCase() ?? ''
  if (!normalized) return null

  if (/(directeur|admin)/.test(normalized)) return 'directeur'
  if (/(pedagog|peda)/.test(normalized)) return 'pedagogie'
  if (/drh/.test(normalized)) return 'drh'
  if (/(gestionnaire|maintenance|maintenancier)/.test(normalized)) return 'gestionnaire'
  if (/(formateur|teacher|enseignant|prof|professeur)/.test(normalized)) return 'teacher'
  if (/(ecole|student|eleve|élève|parent|parents)/.test(normalized)) return 'ecole'

  return null
}

interface SessionLike {
  user?: {
    id?: string
    email?: string | null
    user_metadata?: Record<string, unknown>
    app_metadata?: Record<string, unknown>
  } | null
}

interface ProfileLike {
  role?: string | null
  full_name?: string | null
}

export function resolveAuthUserFromSession(
  session: SessionLike | null,
  profile: ProfileLike | null,
): AuthUser | null {
  const user = session?.user
  if (!user?.id) return null

  const roleFromProfile = (profile?.role as string | null | undefined) ?? null
  const roleFromMetadata = (user.user_metadata?.role as string | null | undefined) ?? (user.app_metadata?.role as string | null | undefined) ?? null
  const inferredRole = mapSupabaseRole(roleFromProfile ?? roleFromMetadata) || inferRoleFromEmail(user.email) || 'ecole'
  const role = inferredRole

  const name =
    (profile?.full_name as string | null | undefined) ??
    (user.user_metadata?.full_name as string | null | undefined) ??
    (user.user_metadata?.name as string | null | undefined) ??
    user.email?.split('@')[0] ??
    'User'

  return {
    id: user.id,
    name,
    email: user.email ?? '',
    role,
  }
}
