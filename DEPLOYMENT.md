# BuzzWeight — Production Deployment

Deploys the **web app** to Vercel with **managed Supabase** and **Resend**. The
self-hosted `deploy/` stack is local-only and is not used in production. The
edge pipeline (cache-handler + MQTT + firmware) runs on-site, not in the cloud.

---

## 1. Supabase (managed)

1. Create a project at [supabase.com](https://supabase.com). From
   **Settings → API**, copy the **Project URL**, **anon key**, and **service_role key**.
2. Apply the schema from `buzzweight/`:
   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push        # applies supabase/migrations/*.sql
   ```
   (Or paste the two files in `buzzweight/supabase/migrations/` into the SQL editor.)
3. **Authentication** settings:
   - **Providers → Email: ENABLED** — this is the login switch, leave it on.
   - **"Allow new users to sign up": OFF** — invite-only; blocks public signup
     without disabling login.
   - **URL Configuration → Site URL:** `https://your-app.vercel.app`
   - **Redirect URLs:** add `https://your-app.vercel.app/auth/callback`
   - **SMTP:** configure custom SMTP (Resend's SMTP works) or invites and
     password-reset emails won't send reliably.
4. Create your first admin user: **Authentication → Users → Add user**. After
   that you can invite others from the app's **Settings** page.

## 2. Resend

1. Create an account and **verify a sending domain** (or use `onboarding@resend.dev`
   for testing only).
2. Create an **API key** → `RESEND_API_KEY`.
3. `CONTACT_FROM` must be an address on the verified domain.

## 3. Vercel

1. Import the repo. **Set Root Directory = `buzzweight`** (monorepo).
2. Add the environment variables from `buzzweight/.env.production.example`
   (Production, and Preview if desired).
3. Deploy.

## 4. Edge pipeline (on-site, not Vercel)

Runs on your gateway (e.g. a Raspberry Pi at the apiary):

- In `KosherM_cache_handler/.env`: set `SERVER_HOST=https://your-app.vercel.app`
  and the **same** `INGEST_SECRET` you set in Vercel. Bring it up with its own
  `docker-compose.yml` (MQTT + Redis + handler).
- Flash the ESP firmware (`KosherM_esp/`) with your real WiFi SSID/password and
  the on-site MQTT broker address.

## 5. Smoke test

```bash
curl -X POST https://your-app.vercel.app/api/data \
  -H 'Content-Type: application/json' -H 'x-ingest-secret: <INGEST_SECRET>' \
  -d '{"scale1":100,"temp1":20,"trailerId":1}'      # → 200
```
Then sign in at `/sign-in` and send a test message via `/contact`.

---

## Checklist

- [ ] Supabase project created; migrations pushed
- [ ] Email provider **on**, signups **off**
- [ ] Site URL + `/auth/callback` redirect URL set
- [ ] Custom SMTP configured
- [ ] First admin user created
- [ ] Resend domain verified; API key created
- [ ] Vercel Root Directory = `buzzweight`
- [ ] All env vars set in Vercel (see `.env.production.example`)
- [ ] `INGEST_SECRET` matches between Vercel and the edge device
- [ ] Edge `SERVER_HOST` points at the Vercel URL
- [ ] Smoke test passes
