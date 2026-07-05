-- Security + robustness hardening for the sensors table.
--
-- 1. Remove the wide-open anon write policy. Ingestion (/api/data) and dashboard
--    reads now run server-side with the service-role key, which bypasses RLS, so
--    no client-facing policy is required. With RLS enabled and no permissive
--    policy, the anon/authenticated keys can neither read nor write directly.
-- 2. Add a composite index for the (trailerId, created_at) range/latest queries.
-- 3. Add batch_id so all readings from a single POST group together reliably,
--    independent of insert timestamp.

DROP POLICY IF EXISTS "Enable write access" ON public.sensors;

CREATE INDEX IF NOT EXISTS "sensors_trailerId_created_at_idx"
    ON public.sensors USING btree ("trailerId", created_at);

ALTER TABLE public.sensors ADD COLUMN IF NOT EXISTS batch_id uuid;

CREATE INDEX IF NOT EXISTS sensors_batch_id_idx
    ON public.sensors USING btree (batch_id);
