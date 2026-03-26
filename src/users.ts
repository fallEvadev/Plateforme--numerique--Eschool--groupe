import { AuthUser } from './features/auth/authSlice'

export interface AppUser extends AuthUser {
  password: string
}

export const USERS: AppUser[] = [
  {
    id: 'dg1',
    name: 'M. Camara',
    email: 'admin@eschool.com',
    role: 'directeur',
    password: 'admin123'
  },
  {
    id: 'pedago1',
    name: 'M. Lô',
    email: 'pedago@eschool.com',
    role: 'pedagogie',
    password: 'pedago123'
  },
  {
    id: 'rh1',
    name: 'Mme Faye',
    email: 'rh@eschool.com',
    role: 'drh',
    password: 'rh123'
  },
  {
    id: 'gest1',
    name: 'M. Ndiaye',
    email: 'maintenance@eschool.com',
    role: 'gestionnaire',
    password: 'main123'
  },
  {
    id: 'prof1',
    name: 'Formateur',
    email: 'formateur@eschool.com',
    role: 'teacher',
    password: 'form123'
  },
  {
    id: 'ecole1',
    name: 'École Partenaire',
    email: 'ecole@eschool.com',
    role: 'ecole',
    password: 'ecole123'
  }
]
