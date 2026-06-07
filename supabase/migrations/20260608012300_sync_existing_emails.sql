-- Sync existing users' emails from auth.users to profiles.email
-- This will update all existing profiles with their corresponding email from auth.users

UPDATE public.profiles
SET email = auth.users.email
FROM auth.users
WHERE public.profiles.id = auth.users.id
AND public.profiles.email IS NULL;
