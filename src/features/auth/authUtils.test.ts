import { describe, expect, it } from 'vitest'
import { resolveAuthUserFromSession } from './authUtils'

describe('resolveAuthUserFromSession', () => {
  it('uses role and name from session metadata when profile lookup fails', () => {
    const session = {
      user: {
        id: 'user-1',
        email: 'teacher@example.com',
        user_metadata: {
          full_name: 'Ada Lovelace',
          role: 'teacher',
        },
      },
    }

    const authUser = resolveAuthUserFromSession(session, null)

    expect(authUser).toEqual({
      id: 'user-1',
      name: 'Ada Lovelace',
      email: 'teacher@example.com',
      role: 'teacher',
    })
  })

  it('falls back to the user email when no role is available', () => {
    const session = {
      user: {
        id: 'user-2',
        email: 'formateur@eschool.com',
      },
    }

    const authUser = resolveAuthUserFromSession(session, null)

    expect(authUser?.role).toBe('teacher')
  })
})
