-- Run this in Supabase SQL Editor if you already ran update_2_site_settings.sql before.
-- Adds columns for business info, hours, social links and hero text, and pre-fills them
-- with your current details so nothing looks empty until you edit it from Site Settings.

alter table site_settings add column if not exists business_name text;
alter table site_settings add column if not exists phone text;
alter table site_settings add column if not exists email text;
alter table site_settings add column if not exists address text;
alter table site_settings add column if not exists hours jsonb default '[]'::jsonb;
alter table site_settings add column if not exists social_links jsonb default '[]'::jsonb;
alter table site_settings add column if not exists hero_heading text;
alter table site_settings add column if not exists hero_subtext text;
alter table site_settings add column if not exists hero_bg_opacity int default 25;

insert into site_settings (
  id, business_name, phone, address, hours, hero_heading, hero_subtext, hero_bg_opacity, social_links
)
values (
  1,
  'Kantha Dental Care',
  '07299044555',
  'No. 1/1A, 4th Lane, Thiruvottiyur High Rd, Tondiarpet, Chennai, Tamil Nadu 600081',
  '[{"day":"Monday – Saturday","time":"9:30 AM – 1:30 PM & 5:00 PM – 9:00 PM"},{"day":"Sunday","time":"10:00 AM – 1:00 PM (By appointment)"}]'::jsonb,
  'Dental care that puts your whole family at ease.',
  'From routine check-ups to root canals, braces and implants — we bring modern treatment and honest advice to your neighbourhood.',
  25,
  '[]'::jsonb
)
on conflict (id) do update set
  business_name = coalesce(site_settings.business_name, excluded.business_name),
  phone = coalesce(site_settings.phone, excluded.phone),
  address = coalesce(site_settings.address, excluded.address),
  hours = case when site_settings.hours is null or site_settings.hours = '[]'::jsonb
               then excluded.hours else site_settings.hours end,
  hero_heading = coalesce(site_settings.hero_heading, excluded.hero_heading),
  hero_subtext = coalesce(site_settings.hero_subtext, excluded.hero_subtext),
  hero_bg_opacity = coalesce(site_settings.hero_bg_opacity, excluded.hero_bg_opacity),
  social_links = coalesce(site_settings.social_links, excluded.social_links);
