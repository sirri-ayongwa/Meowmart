-- Add email column to profiles table
ALTER TABLE public.profiles ADD COLUMN email TEXT;

-- Create index on email for faster lookups
CREATE INDEX profiles_email_idx ON public.profiles(email);

-- Add unique constraint on email
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
