# Kantha Dental Care — Website + Admin Panel

A responsive dental clinic website with an admin panel to manage doctors, offers, and gallery
photos. Built with React + Vite + Tailwind CSS, backed by Supabase (database, auth, file
storage), and deployable on Render.

## What's included

- **Public site**: Home, Services, Doctors, Gallery & Offers, Contact (with embedded Google Map
  to the clinic address)
- **Admin panel** (`/admin`): login-protected pages to add/edit/delete doctor profiles, create
  offers, and upload gallery photos
- Fully responsive — works on phones, tablets and desktops

---

## 1. Set up Supabase (database + auth + storage)

1. Go to [supabase.com](https://supabase.com) and create a new project (free tier is enough to start).
2. Once the project is ready, open **SQL Editor** → **New query**, paste the contents of
   `supabase/schema.sql` from this project, and run it. This creates the `doctors`, `offers`,
   and `gallery_photos` tables, sets up security rules, and creates a public `media` storage
   bucket for photos.
3. Create your admin login: go to **Authentication → Users → Add user**, and create a user with
   your email and a password. This is what you'll use to log in at `/admin/login`.
4. Get your API keys: go to **Project Settings → API**. You'll need:
   - **Project URL**
   - **anon public key**

---

## 2. Run the project locally (optional, to preview before deploying)

```bash
npm install
cp .env.example .env
# edit .env and paste your Supabase Project URL and anon key
npm run dev
```

Visit `http://localhost:5173` for the site, and `http://localhost:5173/admin/login` to log in
as admin.

---

## 3. Push the code to GitHub

```bash
git init
git add .
git commit -m "Initial Kantha Dental Care website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kantha-dental-care.git
git push -u origin main
```

(Create the empty repository on GitHub first, then run the commands above.)

---

## 4. Deploy on Render

1. On [Render](https://render.com), click **New → Static Site**.
2. Connect your GitHub repository.
3. Use these settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon public key
5. Click **Create Static Site**. Render will build and deploy the site, and give you a live URL
   (you can later add a custom domain in Render's settings).

### Important: client-side routing on Render

Since this is a single-page app with routes like `/admin`, `/contact`, etc., add a rewrite rule
so all paths load the app instead of a 404:

- In Render's static site settings, go to **Redirects/Rewrites** and add:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

---

## 5. Using the admin panel

- Go to `yoursite.com/admin/login` and sign in with the admin user you created in Supabase.
- **Doctors** tab: add a doctor's name, qualification, specialty, bio, and photo.
- **Offers** tab: add promotional offers with a title, description and image — toggle them
  active/hidden anytime.
- **Gallery Photos** tab: upload clinic photos shown on the public Gallery page.
- Click **Log out** in the top bar when done, or **View site** to preview changes.

To add more staff/admin logins later, repeat step 1.3 (Authentication → Users → Add user) in
Supabase — no code changes needed.

---

## 6. If you already set up Supabase before this update

This update added editable business info and a theme system. Run these in the SQL Editor, **in
order**, only for the ones you haven't run yet:

1. `supabase/update_2_site_settings.sql` — adds the `site_settings` table (logo + hero photo).
2. `supabase/update_3_business_info.sql` — adds business name, phone, email, address, hours,
   social links and homepage headline text.
3. `supabase/update_4_theme.sql` — adds the `theme` column used by the admin Theme picker.

If you're setting up Supabase for the very first time, just run `supabase/schema.sql` — it
already includes everything.

## 7. Customizing clinic details

Business name, phone, email, address, hours, social links, the homepage headline, logo and
homepage background photo are now all editable from **Site Settings** in the admin panel
(`/admin/settings`) — no code changes needed.

The list of services shown on the Services page is in the same file — edit the `services` array
to add, remove or reword treatments.

---

## Tech stack

- React 18 + Vite
- Tailwind CSS
- React Router
- Supabase (Postgres, Auth, Storage)
- Deployed on Render (static site)
