-- Run this if you already ran the original schema.sql once.
-- Adds the site_settings table used for the logo and homepage background photo.

create table if not exists site_settings (
  id int primary key default 1,
  logo_url text,
  hero_bg_url text,
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
