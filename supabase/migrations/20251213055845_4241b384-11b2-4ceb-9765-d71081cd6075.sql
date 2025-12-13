-- Create enums for structured data
CREATE TYPE public.prompt_status AS ENUM ('active', 'draft', 'archived', 'favorite');
CREATE TYPE public.prompt_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE public.format_type AS ENUM ('fill-in-the-blank', 'question-based', 'example-based');

-- Create prompts table (publicly readable)
CREATE TABLE public.prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  ai_model TEXT NOT NULL DEFAULT 'Universal',
  use_case TEXT,
  status prompt_status NOT NULL DEFAULT 'active',
  priority prompt_priority DEFAULT 'medium',
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  format_type format_type NOT NULL DEFAULT 'question-based',
  notes TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_prompts table for user favorites (requires auth)
CREATE TABLE public.saved_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, prompt_id)
);

-- Create custom_prompts table for user-created prompts (requires auth)
CREATE TABLE public.custom_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  ai_model TEXT NOT NULL DEFAULT 'Universal',
  format_type format_type NOT NULL DEFAULT 'question-based',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recently_used table for tracking usage (requires auth)
CREATE TABLE public.recently_used (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, prompt_id)
);

-- Enable RLS on all tables
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_used ENABLE ROW LEVEL SECURITY;

-- Prompts: Public read access
CREATE POLICY "Prompts are publicly readable"
  ON public.prompts FOR SELECT
  USING (true);

-- Profiles: Users can view all profiles, but only edit their own
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Saved prompts: Users can only access their own
CREATE POLICY "Users can view their saved prompts"
  ON public.saved_prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save prompts"
  ON public.saved_prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave prompts"
  ON public.saved_prompts FOR DELETE
  USING (auth.uid() = user_id);

-- Custom prompts: Users can only access their own
CREATE POLICY "Users can view their custom prompts"
  ON public.custom_prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create custom prompts"
  ON public.custom_prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their custom prompts"
  ON public.custom_prompts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their custom prompts"
  ON public.custom_prompts FOR DELETE
  USING (auth.uid() = user_id);

-- Recently used: Users can only access their own
CREATE POLICY "Users can view their recently used"
  ON public.recently_used FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track recently used"
  ON public.recently_used FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update recently used"
  ON public.recently_used FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_prompts_updated_at
  BEFORE UPDATE ON public.custom_prompts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, display_name)
  VALUES (gen_random_uuid(), NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();