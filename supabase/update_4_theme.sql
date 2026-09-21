-- Run this in Supabase SQL Editor if you already ran update_2 and update_3 before.
-- Adds the theme column used by the admin Theme picker.

alter table site_settings add column if not exists theme text default 'classic';

update site_settings set theme = 'classic' where theme is null and id = 1;
