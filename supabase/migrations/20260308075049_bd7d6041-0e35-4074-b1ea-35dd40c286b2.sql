
-- Drop restrictive policies on saved_images
DROP POLICY IF EXISTS "Users can delete their own images" ON public.saved_images;
DROP POLICY IF EXISTS "Users can insert their own images" ON public.saved_images;
DROP POLICY IF EXISTS "Users can view their own images" ON public.saved_images;

-- Drop restrictive policies on profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Recreate as PERMISSIVE policies for saved_images
CREATE POLICY "Users can view their own images"
ON public.saved_images FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own images"
ON public.saved_images FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own images"
ON public.saved_images FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Recreate as PERMISSIVE policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);
