-- Kantha Dental Care — Supabase schema
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query)

-- 1. DOCTORS TABLE ------------------------------------------------
create table if not exists doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  qualification text,
  specialty text,
  bio text,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table doctors enable row level security;

-- Anyone (including anonymous website visitors) can read doctors
create policy "Public can view doctors"
  on doctors for select
  using (true);

-- Only logged-in (admin) users can insert/update/delete
create policy "Authenticated can manage doctors"
  on doctors for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 2. OFFERS TABLE ---------------------------------------------------
create table if not exists offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

alter table offers enable row level security;

create policy "Public can view offers"
  on offers for select
  using (true);

create policy "Authenticated can manage offers"
  on offers for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 3. GALLERY PHOTOS TABLE --------------------------------------------
create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  created_at timestamptz default now()
);

alter table gallery_photos enable row level security;

create policy "Public can view gallery photos"
  on gallery_photos for select
  using (true);

create policy "Authenticated can manage gallery photos"
  on gallery_photos for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 4. SITE SETTINGS TABLE (logo, hero background, business info, hours, socials) ----
-- Single-row table (id is always 1) holding all site-wide editable content.
create table if not exists site_settings (
  id int primary key default 1,
  logo_url text,
  hero_bg_url text,
  hero_bg_opacity int default 25,
  hero_heading text,
  hero_subtext text,
  business_name text,
  phone text,
  email text,
  address text,
  hours jsonb default '[]'::jsonb,
  social_links jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table site_settings enable row level security;

create policy "Public can view site settings"
  on site_settings for select
  using (true);

create policy "Authenticated can manage site settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');


-- 5. STORAGE BUCKET FOR PHOTOS ----------------------------------------
-- Create a public bucket called "media" (doctor photos, offer images, gallery photos)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view files in the media bucket (needed so the public site can show images)
create policy "Public can view media files"
  on storage.objects for select
  using (bucket_id = 'media');

-- Only authenticated (admin) users can upload/update/delete
create policy "Authenticated can upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated can update media"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated can delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
