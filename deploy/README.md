# BuzzWeight — Self-hosted Docker stack

Runs the **entire** BuzzWeight system on one machine with a single command:

- **Self-hosted Supabase** — Postgres, Auth (GoTrue), REST (PostgREST), Studio,
  Kong gateway, Realtime, Storage, Meta, Edge Functions, Supavisor pooler.
- **BuzzWeight app** — the Next.js dashboard + ingestion API (`app`).
- **Edge pipeline** — Mosquitto MQTT broker (`mqtt`), Redis (`redis`), and the
  `cache-handler` aggregator that forwards sensor data to the app.

The base `docker-compose.yml` is the official Supabase self-hosting file; our
services and database migrations are layered on via `docker-compose.override.yml`.

## Prerequisites

- Docker + Docker Compose v2
- ~4 GB free RAM

## Quick start

```bash
cd deploy
docker compose up -d          # first run pulls images & builds the app (~5 min)
docker compose ps             # all services should be healthy
```

| Service            | URL                              |
|--------------------|----------------------------------|
| BuzzWeight app     | http://localhost:3000            |
| Supabase Studio    | http://localhost:8000            |
| Ingestion endpoint | http://localhost:3000/api/data   |

Studio login: `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD` from `.env`
(default `supabase` / `this_password_is_insecure_and_should_be_updated`).

## Create the first user (invite-only)

Public sign-up is disabled. Create a user once via Studio:

1. Open http://localhost:8000 → **Authentication → Users → Add user**.
2. Enter an email + password (email auto-confirms locally — no SMTP needed).
3. Sign in at http://localhost:3000/sign-in.

Thereafter you can invite teammates from **Settings → Invite** in the app.

## Verify ingestion

```bash
curl -X POST http://localhost:3000/api/data \
  -H 'Content-Type: application/json' \
  -H 'x-ingest-secret: local-dev-ingest-secret-change-me' \
  -d '{"scale1":123.5,"temp1":21,"trailerId":1}'
# → {"message":"Data written successfully"}
```

The `cache-handler` does this automatically: it subscribes to the MQTT topic
`Trailer1/sensors`, caches readings in Redis, and every 5 minutes POSTs an
aggregated payload to the app. Publish a test reading:

```bash
docker exec supabase-mqtt-1 mosquitto_pub -t Trailer1/sensors -m '{"scale1":222.4}'
```

## Database migrations

`buzzweight/supabase/migrations/*.sql` are mounted into the Postgres init
directory and applied automatically **on first boot** (fresh volume). To
re-apply from scratch, wipe the data volume:

```bash
docker compose down -v && docker compose up -d
```

## Configuration (`.env`)

`.env` ships with Supabase's well-known **demo** secrets so the stack boots out
of the box. **Change these before any non-local deployment:**

- `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY`
- `DASHBOARD_USERNAME` / `DASHBOARD_PASSWORD`
- `SECRET_KEY_BASE`, `VAULT_ENC_KEY`
- `INGEST_SECRET` — shared secret for `/api/data` (also used by `cache-handler`)
- `RESEND_API_KEY` — set to enable the contact form (delivered to `CONTACT_TO`)

Regenerate JWT-based keys with `openssl` + the Supabase key generator; see
https://supabase.com/docs/guides/self-hosting/docker.

## Stopping

```bash
docker compose down       # stop, keep data
docker compose down -v    # stop and delete all data (incl. the database)
```
