import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Student {
  id: string
  name: string
  email: string
  className: string
  parentName: string
  phone: string
  address: string
  dateOfBirth: string
  gender: 'M' | 'F'
  status: 'active' | 'inactive'
  enrollmentDate: string
  avatar: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  phone: string
  address: string
  dateOfBirth: string
  gender: 'M' | 'F'
  status: 'active' | 'inactive'
  hireDate: string
  classes: string[]
  avatar: string
}

export interface Parent {
  id: string
  name: string
  email: string
  phone: string
  address: string
  children: string[]
  occupation: string
  status: 'active' | 'inactive'
}

export interface SchoolClass {
  id: string
  name: string
  level: string
  teacherId: string
  teacherName: string
  studentCount: number
  capacity: number
  room: string
  schedule: string
}

export interface Subject {
  id: string
  name: string
  code: string
  description: string
  teacherId: string
  teacherName: string
  classes: string[]
  weeklyHours: number
  coefficient: number
}

export interface TimetableEntry {
  id: string
  day: string
  startTime: string
  endTime: string
  subject: string
  teacher: string
  room: string
  className: string
}

export interface Exam {
  id: string
  title: string
  subject: string
  className: string
  date: string
  startTime: string
  duration: number
  room: string
  coefficient: number
  type: 'controle' | 'composition' | 'rattrapage'
  status: 'scheduled' | 'ongoing' | 'completed'
}

export interface Grade {
  id: string
  studentId: string
  studentName: string
  className: string
  subject: string
  examId: string
  examTitle: string
  score: number
  maxScore: number
  coefficient: number
  date: string
  teacherId: string
  teacherName: string
  appreciation: string
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  className: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  reason?: string
  teacherId: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  className: string
  teacherId: string
  teacherName: string
  dueDate: string
  createdDate: string
  status: 'active' | 'closed'
  submissions: number
  totalStudents: number
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  date: string
  targetRoles: string[]
  targetClasses?: string[]
  priority: 'low' | 'medium' | 'high'
  pinned: boolean
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  totalSubjects: number
  attendanceRate: number
  averageGrade: number
  monthlyEnrollment: { month: string; count: number }[]
  gradeDistribution: { range: string; count: number }[]
  attendanceByDay: { day: string; present: number; absent: number }[]
  subjectPerformance: { subject: string; average: number }[]
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const STUDENTS: Student[] = [
  { id: 's1', name: 'Amina Benali', email: 'amina.benali@eschool.dz', className: '3ème A', parentName: 'Fatima Benali', phone: '0555123456', address: 'Alger Centre', dateOfBirth: '2010-03-15', gender: 'F', status: 'active', enrollmentDate: '2023-09-01', avatar: 'AB' },
  { id: 's2', name: 'Karim Meziane', email: 'karim.meziane@eschool.dz', className: '3ème A', parentName: 'Mohamed Meziane', phone: '0555234567', address: 'Bab El Oued', dateOfBirth: '2010-07-22', gender: 'M', status: 'active', enrollmentDate: '2023-09-01', avatar: 'KM' },
  { id: 's3', name: 'Yasmine Khelif', email: 'yasmine.khelif@eschool.dz', className: '4ème B', parentName: 'Nadia Khelif', phone: '0555345678', address: 'El Harrach', dateOfBirth: '2009-11-08', gender: 'F', status: 'active', enrollmentDate: '2022-09-01', avatar: 'YK' },
  { id: 's4', name: 'Omar Brahimi', email: 'omar.brahimi@eschool.dz', className: '5ème C', parentName: 'Ali Brahimi', phone: '0555456789', address: 'Hussein Dey', dateOfBirth: '2008-05-30', gender: 'M', status: 'active', enrollmentDate: '2021-09-01', avatar: 'OB' },
  { id: 's5', name: 'Sara Mansouri', email: 'sara.mansouri@eschool.dz', className: '3ème A', parentName: 'Hind Mansouri', phone: '0555567890', address: 'Kouba', dateOfBirth: '2010-01-18', gender: 'F', status: 'active', enrollmentDate: '2023-09-01', avatar: 'SM' },
  { id: 's6', name: 'Hamza Tizi', email: 'hamza.tizi@eschool.dz', className: '4ème B', parentName: 'Rachid Tizi', phone: '0555678901', address: 'Sétif', dateOfBirth: '2009-09-12', gender: 'M', status: 'inactive', enrollmentDate: '2022-09-01', avatar: 'HT' },
  { id: 's7', name: 'Nour Hadjadj', email: 'nour.hadjadj@eschool.dz', className: '5ème C', parentName: 'Samira Hadjadj', phone: '0555789012', address: 'Annaba', dateOfBirth: '2008-12-03', gender: 'F', status: 'active', enrollmentDate: '2021-09-01', avatar: 'NH' },
  { id: 's8', name: 'Bilal Aissaoui', email: 'bilal.aissaoui@eschool.dz', className: '3ème B', parentName: 'Lyes Aissaoui', phone: '0555890123', address: 'Oran', dateOfBirth: '2010-06-25', gender: 'M', status: 'active', enrollmentDate: '2023-09-01', avatar: 'BA' },
]

const TEACHERS: Teacher[] = [
  { id: 't1', name: 'Prof. Fall', email: 'r.boumediene@eschool.dz', subject: 'Mathématiques', phone: '0550111222', address: 'Alger', dateOfBirth: '1980-04-10', gender: 'M', status: 'active', hireDate: '2015-09-01', classes: ['3ème A', '4ème B'], avatar: 'RB' },
  { id: 't2', name: 'Prof. Leila Amrani', email: 'l.amrani@eschool.dz', subject: 'Français', phone: '0550222333', address: 'Blida', dateOfBirth: '1985-08-22', gender: 'F', status: 'active', hireDate: '2018-09-01', classes: ['3ème A', '3ème B', '5ème C'], avatar: 'LA' },
  { id: 't3', name: 'Prof. Kamel Djaout', email: 'k.djaout@eschool.dz', subject: 'Sciences Naturelles', phone: '0550333444', address: 'Tizi Ouzou', dateOfBirth: '1978-12-05', gender: 'M', status: 'active', hireDate: '2012-09-01', classes: ['4ème B', '5ème C'], avatar: 'KD' },
  { id: 't4', name: 'Prof. Sonia Belkacem', email: 's.belkacem@eschool.dz', subject: 'Histoire-Géographie', phone: '0550444555', address: 'Constantine', dateOfBirth: '1982-03-17', gender: 'F', status: 'active', hireDate: '2016-09-01', classes: ['3ème A', '3ème B'], avatar: 'SB' },
  { id: 't5', name: 'Prof. Farid Larbaoui', email: 'f.larbaoui@eschool.dz', subject: 'Physique-Chimie', phone: '0550555666', address: 'Sétif', dateOfBirth: '1975-07-29', gender: 'M', status: 'active', hireDate: '2010-09-01', classes: ['5ème C'], avatar: 'FL' },
]

const PARENTS: Parent[] = [
  { id: 'p1', name: 'Fatima Benali', email: 'f.benali@gmail.com', phone: '0555123456', address: 'Alger Centre', children: ['Amina Benali'], occupation: 'Médecin', status: 'active' },
  { id: 'p2', name: 'Mohamed Meziane', email: 'm.meziane@gmail.com', phone: '0555234567', address: 'Bab El Oued', children: ['Karim Meziane'], occupation: 'Ingénieur', status: 'active' },
  { id: 'p3', name: 'Nadia Khelif', email: 'n.khelif@gmail.com', phone: '0555345678', address: 'El Harrach', children: ['Yasmine Khelif'], occupation: 'Enseignante', status: 'active' },
  { id: 'p4', name: 'Ali Brahimi', email: 'a.brahimi@gmail.com', phone: '0555456789', address: 'Hussein Dey', children: ['Omar Brahimi'], occupation: 'Commerçant', status: 'active' },
  { id: 'p5', name: 'Hind Mansouri', email: 'h.mansouri@gmail.com', phone: '0555567890', address: 'Kouba', children: ['Sara Mansouri'], occupation: 'Pharmacienne', status: 'active' },
]

const CLASSES: SchoolClass[] = [
  { id: 'c1', name: '3ème A', level: '3ème', teacherId: 't1', teacherName: 'Prof. Fall', studentCount: 28, capacity: 35, room: 'Salle 101', schedule: 'Lun-Sam' },
  { id: 'c2', name: '3ème B', level: '3ème', teacherId: 't4', teacherName: 'Prof. Sonia Belkacem', studentCount: 30, capacity: 35, room: 'Salle 102', schedule: 'Lun-Sam' },
  { id: 'c3', name: '4ème B', level: '4ème', teacherId: 't3', teacherName: 'Prof. Kamel Djaout', studentCount: 25, capacity: 35, room: 'Salle 201', schedule: 'Lun-Sam' },
  { id: 'c4', name: '5ème C', level: '5ème', teacherId: 't5', teacherName: 'Prof. Farid Larbaoui', studentCount: 22, capacity: 35, room: 'Salle 301', schedule: 'Lun-Sam' },
]

const SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Mathématiques', code: 'MATH', description: 'Algèbre, Géométrie, Analyse', teacherId: 't1', teacherName: 'Prof. Fall', classes: ['3ème A', '4ème B'], weeklyHours: 5, coefficient: 5 },
  { id: 'sub2', name: 'Français', code: 'FR', description: 'Langue et littérature françaises', teacherId: 't2', teacherName: 'Prof. Leila Amrani', classes: ['3ème A', '3ème B', '5ème C'], weeklyHours: 4, coefficient: 4 },
  { id: 'sub3', name: 'Sciences Naturelles', code: 'SN', description: 'Biologie, Géologie', teacherId: 't3', teacherName: 'Prof. Kamel Djaout', classes: ['4ème B', '5ème C'], weeklyHours: 3, coefficient: 3 },
  { id: 'sub4', name: 'Histoire-Géographie', code: 'HG', description: 'Histoire et Géographie nationales', teacherId: 't4', teacherName: 'Prof. Sonia Belkacem', classes: ['3ème A', '3ème B'], weeklyHours: 3, coefficient: 3 },
  { id: 'sub5', name: 'Physique-Chimie', code: 'PC', description: 'Physique et chimie expérimentale', teacherId: 't5', teacherName: 'Prof. Farid Larbaoui', classes: ['5ème C'], weeklyHours: 4, coefficient: 4 },
  { id: 'sub6', name: 'Arabe', code: 'AR', description: 'Langue et littérature arabes', teacherId: 't2', teacherName: 'Prof. Leila Amrani', classes: ['3ème A', '3ème B', '4ème B', '5ème C'], weeklyHours: 5, coefficient: 5 },
]

const TIMETABLE: TimetableEntry[] = [
  { id: 'tt1', day: 'Lundi', startTime: '08:00', endTime: '09:00', subject: 'Mathématiques', teacher: 'Prof. Fall', room: 'Salle 101', className: '3ème A' },
  { id: 'tt2', day: 'Lundi', startTime: '09:00', endTime: '10:00', subject: 'Français', teacher: 'Prof. Leila Amrani', room: 'Salle 101', className: '3ème A' },
  { id: 'tt3', day: 'Lundi', startTime: '10:30', endTime: '11:30', subject: 'Histoire-Géographie', teacher: 'Prof. Sonia Belkacem', room: 'Salle 101', className: '3ème A' },
  { id: 'tt4', day: 'Mardi', startTime: '08:00', endTime: '09:00', subject: 'Arabe', teacher: 'Prof. Leila Amrani', room: 'Salle 101', className: '3ème A' },
  { id: 'tt5', day: 'Mardi', startTime: '09:00', endTime: '10:00', subject: 'Mathématiques', teacher: 'Prof. Fall', room: 'Salle 101', className: '3ème A' },
  { id: 'tt6', day: 'Mercredi', startTime: '08:00', endTime: '09:00', subject: 'Français', teacher: 'Prof. Leila Amrani', room: 'Salle 101', className: '3ème A' },
  { id: 'tt7', day: 'Jeudi', startTime: '08:00', endTime: '09:00', subject: 'Mathématiques', teacher: 'Prof. Fall', room: 'Salle 101', className: '3ème A' },
  { id: 'tt8', day: 'Jeudi', startTime: '09:00', endTime: '10:00', subject: 'Histoire-Géographie', teacher: 'Prof. Sonia Belkacem', room: 'Salle 101', className: '3ème A' },
  { id: 'tt9', day: 'Samedi', startTime: '08:00', endTime: '09:00', subject: 'Arabe', teacher: 'Prof. Leila Amrani', room: 'Salle 101', className: '3ème A' },
]

const EXAMS: Exam[] = [
  { id: 'e1', title: 'Contrôle N°1 - Maths', subject: 'Mathématiques', className: '3ème A', date: '2026-03-15', startTime: '08:00', duration: 60, room: 'Salle 101', coefficient: 2, type: 'controle', status: 'scheduled' },
  { id: 'e2', title: 'Composition T1 - Français', subject: 'Français', className: '3ème A', date: '2026-03-18', startTime: '10:00', duration: 120, room: 'Salle 101', coefficient: 3, type: 'composition', status: 'scheduled' },
  { id: 'e3', title: 'Contrôle N°2 - Histoire', subject: 'Histoire-Géographie', className: '3ème A', date: '2026-03-10', startTime: '09:00', duration: 60, room: 'Salle 101', coefficient: 2, type: 'controle', status: 'completed' },
  { id: 'e4', title: 'Contrôle N°1 - PC', subject: 'Physique-Chimie', className: '5ème C', date: '2026-03-20', startTime: '08:00', duration: 90, room: 'Salle 301', coefficient: 2, type: 'controle', status: 'scheduled' },
  { id: 'e5', title: 'Composition T1 - Maths', subject: 'Mathématiques', className: '4ème B', date: '2026-03-05', startTime: '08:00', duration: 120, room: 'Salle 201', coefficient: 3, type: 'composition', status: 'completed' },
]

const GRADES: Grade[] = [
  { id: 'g1', studentId: 's1', studentName: 'Amina Benali', className: '3ème A', subject: 'Mathématiques', examId: 'e1', examTitle: 'Contrôle N°1 - Maths', score: 16.5, maxScore: 20, coefficient: 2, date: '2026-02-20', teacherId: 't1', teacherName: 'Prof. Fall', appreciation: 'Très bien' },
  { id: 'g2', studentId: 's1', studentName: 'Amina Benali', className: '3ème A', subject: 'Français', examId: 'e2', examTitle: 'Composition T1 - Français', score: 14.0, maxScore: 20, coefficient: 3, date: '2026-02-22', teacherId: 't2', teacherName: 'Prof. Leila Amrani', appreciation: 'Bien' },
  { id: 'g3', studentId: 's2', studentName: 'Karim Meziane', className: '3ème A', subject: 'Mathématiques', examId: 'e1', examTitle: 'Contrôle N°1 - Maths', score: 12.0, maxScore: 20, coefficient: 2, date: '2026-02-20', teacherId: 't1', teacherName: 'Prof. Fall', appreciation: 'Assez bien' },
  { id: 'g4', studentId: 's3', studentName: 'Yasmine Khelif', className: '4ème B', subject: 'Sciences Naturelles', examId: 'e5', examTitle: 'Composition T1 - SN', score: 18.0, maxScore: 20, coefficient: 3, date: '2026-02-25', teacherId: 't3', teacherName: 'Prof. Kamel Djaout', appreciation: 'Excellent' },
  { id: 'g5', studentId: 's4', studentName: 'Omar Brahimi', className: '5ème C', subject: 'Physique-Chimie', examId: 'e4', examTitle: 'Contrôle N°1 - PC', score: 11.5, maxScore: 20, coefficient: 2, date: '2026-02-28', teacherId: 't5', teacherName: 'Prof. Farid Larbaoui', appreciation: 'Passable' },
  { id: 'g6', studentId: 's5', studentName: 'Sara Mansouri', className: '3ème A', subject: 'Mathématiques', examId: 'e1', examTitle: 'Contrôle N°1 - Maths', score: 17.5, maxScore: 20, coefficient: 2, date: '2026-02-20', teacherId: 't1', teacherName: 'Prof. Fall', appreciation: 'Excellent' },
  { id: 'g7', studentId: 's7', studentName: 'Nour Hadjadj', className: '5ème C', subject: 'Physique-Chimie', examId: 'e4', examTitle: 'Contrôle N°1 - PC', score: 15.0, maxScore: 20, coefficient: 2, date: '2026-02-28', teacherId: 't5', teacherName: 'Prof. Farid Larbaoui', appreciation: 'Bien' },
  { id: 'g8', studentId: 's8', studentName: 'Bilal Aissaoui', className: '3ème B', subject: 'Français', examId: 'e2', examTitle: 'Composition T1 - Français', score: 13.0, maxScore: 20, coefficient: 3, date: '2026-02-22', teacherId: 't2', teacherName: 'Prof. Leila Amrani', appreciation: 'Assez bien' },
]

const ATTENDANCE: AttendanceRecord[] = [
  { id: 'att1', studentId: 's1', studentName: 'Amina Benali', className: '3ème A', date: '2026-03-09', status: 'present', teacherId: 't1' },
  { id: 'att2', studentId: 's2', studentName: 'Karim Meziane', className: '3ème A', date: '2026-03-09', status: 'absent', reason: 'Maladie', teacherId: 't1' },
  { id: 'att3', studentId: 's5', studentName: 'Sara Mansouri', className: '3ème A', date: '2026-03-09', status: 'present', teacherId: 't1' },
  { id: 'att4', studentId: 's3', studentName: 'Yasmine Khelif', className: '4ème B', date: '2026-03-09', status: 'late', reason: 'Transport', teacherId: 't3' },
  { id: 'att5', studentId: 's4', studentName: 'Omar Brahimi', className: '5ème C', date: '2026-03-09', status: 'present', teacherId: 't5' },
  { id: 'att6', studentId: 's7', studentName: 'Nour Hadjadj', className: '5ème C', date: '2026-03-09', status: 'excused', reason: 'Rendez-vous médical', teacherId: 't5' },
  { id: 'att7', studentId: 's8', studentName: 'Bilal Aissaoui', className: '3ème B', date: '2026-03-09', status: 'present', teacherId: 't2' },
]

const ASSIGNMENTS: Assignment[] = [
  { id: 'as1', title: 'Exercices sur les équations du second degré', description: 'Résoudre les exercices p. 45-47 du manuel', subject: 'Mathématiques', className: '3ème A', teacherId: 't1', teacherName: 'Prof. Rachid Boumediene', dueDate: '2026-03-15', createdDate: '2026-03-07', status: 'active', submissions: 18, totalStudents: 28 },
  { id: 'as2', title: 'Commentaire de texte - Camus', description: "Rédiger un commentaire de texte sur l'extrait de L'Étranger", subject: 'Français', className: '3ème A', teacherId: 't2', teacherName: 'Prof. Leila Amrani', dueDate: '2026-03-20', createdDate: '2026-03-08', status: 'active', submissions: 10, totalStudents: 28 },
  { id: 'as3', title: 'TP: Dissection de grenouille', description: 'Rapport de TP sur la dissection effectuée en classe', subject: 'Sciences Naturelles', className: '4ème B', teacherId: 't3', teacherName: 'Prof. Kamel Djaout', dueDate: '2026-03-12', createdDate: '2026-03-05', status: 'active', submissions: 22, totalStudents: 25 },
  { id: 'as4', title: 'Recherche: La Guerre de Libération', description: 'Exposé de 5 pages sur la révolution algérienne', subject: 'Histoire-Géographie', className: '3ème B', teacherId: 't4', teacherName: 'Prof. Sonia Belkacem', dueDate: '2026-03-25', createdDate: '2026-03-01', status: 'active', submissions: 14, totalStudents: 30 },
]

const ANNOUNCEMENTS: Announcement[] = [
  { id: 'an1', title: 'Réunion des parents - Trimestre 2', content: "Chers parents, nous vous informons qu'une réunion se tiendra le 20 mars 2026 à 14h00 pour discuter des résultats du 2ème trimestre. Votre présence est souhaitée.", author: 'Administration', authorRole: 'admin', date: '2026-03-08', targetRoles: ['parent', 'teacher'], priority: 'high', pinned: true },
  { id: 'an2', title: 'Calendrier des examens - Trimestre 2', content: 'Le calendrier des compositions du 2ème trimestre est disponible. Veuillez consulter le tableau des emplois du temps pour les dates et horaires.', author: 'Administration', authorRole: 'admin', date: '2026-03-05', targetRoles: ['student', 'teacher', 'parent'], priority: 'high', pinned: true },
  { id: 'an3', title: 'Journée portes ouvertes', content: "L'établissement organise une journée portes ouvertes le 25 mars 2026. Tous les élèves et parents sont invités à participer.", author: 'Administration', authorRole: 'admin', date: '2026-03-01', targetRoles: ['student', 'teacher', 'parent'], priority: 'medium', pinned: false },
  { id: 'an4', title: 'Formation continue - Enseignants', content: 'Une formation sur les nouvelles méthodes pédagogiques aura lieu le 22 mars. La participation est obligatoire pour tous les enseignants.', author: 'Direction Pédagogique', authorRole: 'admin', date: '2026-02-28', targetRoles: ['teacher'], priority: 'medium', pinned: false },
  { id: 'an5', title: "Compétition d'excellence - Inscriptions ouvertes", content: "Les inscriptions pour la compétition d'excellence inter-établissements sont ouvertes jusqu'au 30 mars. Parlez à votre professeur pour vous inscrire.", author: 'Conseiller Principal', authorRole: 'admin', date: '2026-02-25', targetRoles: ['student'], priority: 'low', pinned: false },
]

const DASHBOARD_STATS: DashboardStats = {
  totalStudents: 247,
  totalTeachers: 18,
  totalClasses: 12,
  totalSubjects: 8,
  attendanceRate: 94.2,
  averageGrade: 13.8,
  monthlyEnrollment: [
    { month: 'Sep', count: 40 }, { month: 'Oct', count: 15 }, { month: 'Nov', count: 8 },
    { month: 'Déc', count: 3 }, { month: 'Jan', count: 12 }, { month: 'Fév', count: 6 },
    { month: 'Mar', count: 4 },
  ],
  gradeDistribution: [
    { range: '0-5', count: 5 }, { range: '5-10', count: 20 },
    { range: '10-12', count: 45 }, { range: '12-14', count: 68 },
    { range: '14-16', count: 72 }, { range: '16-18', count: 32 }, { range: '18-20', count: 5 },
  ],
  attendanceByDay: [
    { day: 'Lun', present: 232, absent: 15 }, { day: 'Mar', present: 238, absent: 9 },
    { day: 'Mer', present: 229, absent: 18 }, { day: 'Jeu', present: 241, absent: 6 },
    { day: 'Sam', present: 220, absent: 27 },
  ],
  subjectPerformance: [
    { subject: 'Maths', average: 12.4 }, { subject: 'Français', average: 13.8 },
    { subject: 'SN', average: 14.5 }, { subject: 'H-G', average: 13.2 },
    { subject: 'PC', average: 11.9 }, { subject: 'Arabe', average: 14.1 },
  ],
}

// ─── Mock fetch utility ───────────────────────────────────────────────────────

function mockFetch<T>(data: T, delay = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

// ─── RTK Query API ────────────────────────────────────────────────────────────

export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Students', 'Teachers', 'Parents', 'Classes', 'Subjects', 'Timetable', 'Exams', 'Grades', 'Attendance', 'Assignments', 'Announcements'],
  endpoints: (builder) => ({
    // Dashboard
    getDashboardStats: builder.query<DashboardStats, void>({
      queryFn: async () => ({ data: await mockFetch(DASHBOARD_STATS) }),
    }),
    // Students
    getStudents: builder.query<Student[], void>({
      queryFn: async () => ({ data: await mockFetch(STUDENTS) }),
      providesTags: ['Students'],
    }),
    getStudentById: builder.query<Student, string>({
      queryFn: async (id) => ({ data: await mockFetch(STUDENTS.find(s => s.id === id)!) }),
    }),
    // Teachers
    getTeachers: builder.query<Teacher[], void>({
      queryFn: async () => ({ data: await mockFetch(TEACHERS) }),
      providesTags: ['Teachers'],
    }),
    // Parents
    getParents: builder.query<Parent[], void>({
      queryFn: async () => ({ data: await mockFetch(PARENTS) }),
      providesTags: ['Parents'],
    }),
    // Classes
    getClasses: builder.query<SchoolClass[], void>({
      queryFn: async () => ({ data: await mockFetch(CLASSES) }),
      providesTags: ['Classes'],
    }),
    // Subjects
    getSubjects: builder.query<Subject[], void>({
      queryFn: async () => ({ data: await mockFetch(SUBJECTS) }),
      providesTags: ['Subjects'],
    }),
    // Timetable
    getTimetable: builder.query<TimetableEntry[], string | void>({
      queryFn: async (className) => ({
        data: await mockFetch(className ? TIMETABLE.filter(t => t.className === className) : TIMETABLE)
      }),
      providesTags: ['Timetable'],
    }),
    // Exams
    getExams: builder.query<Exam[], void>({
      queryFn: async () => ({ data: await mockFetch(EXAMS) }),
      providesTags: ['Exams'],
    }),
    // Grades
    getGrades: builder.query<Grade[], void>({
      queryFn: async () => ({ data: await mockFetch(GRADES) }),
      providesTags: ['Grades'],
    }),
    getGradesByStudent: builder.query<Grade[], string>({
      queryFn: async (studentId) => ({ data: await mockFetch(GRADES.filter(g => g.studentId === studentId)) }),
    }),
    // Attendance
    getAttendance: builder.query<AttendanceRecord[], void>({
      queryFn: async () => ({ data: await mockFetch(ATTENDANCE) }),
      providesTags: ['Attendance'],
    }),
    // Assignments
    getAssignments: builder.query<Assignment[], void>({
      queryFn: async () => ({ data: await mockFetch(ASSIGNMENTS) }),
      providesTags: ['Assignments'],
    }),
    // Announcements
    getAnnouncements: builder.query<Announcement[], string | void>({
      queryFn: async (role) => ({
        data: await mockFetch(role ? ANNOUNCEMENTS.filter(a => a.targetRoles.includes(role)) : ANNOUNCEMENTS)
      }),
      providesTags: ['Announcements'],
    }),
  }),
})

export const {
  useGetDashboardStatsQuery,
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useGetTeachersQuery,
  useGetParentsQuery,
  useGetClassesQuery,
  useGetSubjectsQuery,
  useGetTimetableQuery,
  useGetExamsQuery,
  useGetGradesQuery,
  useGetGradesByStudentQuery,
  useGetAttendanceQuery,
  useGetAssignmentsQuery,
  useGetAnnouncementsQuery,
} = schoolApi
