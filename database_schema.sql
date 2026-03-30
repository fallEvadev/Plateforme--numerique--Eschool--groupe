-- E-SCHOOL GROUPE V 2.7 Database Schema
-- Database: eschool_db

-- 1) If you want role as a real enum type (optional but recommended)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'teacher', 'maintenance');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  role user_role NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- updated_at trigger (replacement for MySQL "ON UPDATE CURRENT_TIMESTAMP")
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON public.users;
CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.schools (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.session_codes (
  id BIGSERIAL PRIMARY KEY,
  access_code VARCHAR(10) NOT NULL UNIQUE,
  teacher_id BIGINT NOT NULL,
  school_id BIGINT NOT NULL,
  is_used BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (teacher_id) REFERENCES public.users(id) ON DELETE CASCADE,
  FOREIGN KEY (school_id) REFERENCES public.schools(id) ON DELETE CASCADE
);

-- Dummy Data for Testing
-- In Postgres, use INSERT ... ON CONFLICT ... DO NOTHING (replacement for INSERT IGNORE)

INSERT INTO public.users (id, role, email, password_hash, full_name)
VALUES
(1, 'teacher', 'r.boumediene@eschool.dz', 'hashed_pwd_here', 'Prof. Rachid Boumediene')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.schools (id, name, address)
VALUES
(1, 'Lycée Emir Abdelkader', 'Alger Centre')
ON CONFLICT (id) DO NOTHING;

-- Create a valid code that expires in the future
INSERT INTO public.session_codes (access_code, teacher_id, school_id, is_used, expires_at)
VALUES
('123456', 1, 1, FALSE, NOW() + INTERVAL '1 day')
ON CONFLICT (access_code) DO NOTHING;