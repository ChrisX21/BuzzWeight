# BuzzWeight

Web dashboard + ingestion API for a smart apiary / trailer monitoring system.
Built with Next.js (App Router) and Supabase (Postgres + Auth), deployed on Vercel.

This is the web tier of a larger IoT system. The device and edge layers live in sibling
repos under the parent directory:

- `KosherM_esp/` — ESP8266 firmware (load-cell scales + DHT temp/humidity). Publishes
  per-node JSON to MQTT topic `Trailer1/sensors`.
- `KosherM_cache_handler/` — on-site Node aggregator. Subscribes to MQTT, caches each
  reading in Redis, debounces, then POSTs one flat JSON payload to `/api/data`.

## Data flow

```
ESP8266 nodes ──MQTT {"scale1":224}──▶ Mosquitto ──▶ cache_handler (Redis) ──┐
                                                                              │  debounced, aggregated
   Supabase `sensors` ◀── writeSupabaseService ◀── POST /api/data ◀──────────┘
```

Ingestion payload (`POST /api/data`, `Content-Type: application/json`, header
`x-ingest-secret: <INGEST_SECRET>`):

```json
{ "scale1": 224, "scale2": 221, "scaleH": 123,
  "temp1": 31, "hum1": 42, "trailerId": 1 }
```

`writeSupabaseService` drops `trailerId`/non-numeric keys, tags all readings from one POST
with a shared `batch_id` (uuid), and inserts one row per sensor into the `sensors` table.
Dashboard queries pivot rows back into readings grouped by `batch_id` (`lib/utils.ts`).

## Storage: `sensors` table (EAV)

| column     | type            | notes                              |
|------------|-----------------|------------------------------------|
| id         | bigint identity | primary key                        |
| sensor     | varchar         | e.g. `scale1`, `temp1`             |
| value      | real            | reading                            |
| trailerId  | integer         | which trailer                      |
| created_at | timestamptz     | insert time (transaction-constant) |
| batch_id   | uuid            | groups all readings from one POST  |

RLS is enabled with **no permissive policy** — direct anon/authenticated access is denied.
Server code reads/writes with the service-role key (`utils/supabase/service.ts`), which
bypasses RLS. Never import that client into a client component.

## Auth

Supabase Auth (cookie sessions via `@supabase/ssr`). Onboarding is **invite-only** through
`POST /api/admin/invite` (requires an authenticated caller; optionally restricted to
`ADMIN_EMAILS`). Public sign-up is disabled.

## Environment variables

| var | used by | purpose |
|-----|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | app | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | app (auth/session) | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | server routes | trusted reads/writes + admin invite |
| `INGEST_SECRET` | `/api/data` | shared secret; must match the cache handler |
| `ADMIN_EMAILS` | `/api/admin/invite` | optional comma-separated admin allowlist |

## Development

```bash
npm install
cp .env.example .env.local   # fill in the vars above
npm run dev                  # http://localhost:3000
```

Apply database migrations with the Supabase CLI:

```bash
supabase db push             # applies supabase/migrations/*.sql
```

## Test the ingestion endpoint

```bash
curl -X POST http://localhost:3000/api/data \
  -H 'Content-Type: application/json' \
  -H 'x-ingest-secret: <INGEST_SECRET>' \
  -d '{"scale1":100,"temp1":20,"trailerId":1}'
# → 200 {"message":"Data written successfully"}
# missing/wrong header → 401 ; DB error → 500
```
