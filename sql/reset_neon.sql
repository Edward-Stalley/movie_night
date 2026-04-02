-- USED IN scripts/sync_to_neon.sh

-- reset_neon.sql
-- Drops Tables And Clears ALL DATA

DO $$ DECLARE
    r RECORD;
BEGIN
    -- Drop all tables in public schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop all sequences in public schema
    FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema='public') LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequence_name) || ' CASCADE';
    END LOOP;
END $$;

-- Reset ownership and privileges for public schema
ALTER SCHEMA public OWNER TO neondb_owner;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO neondb_owner;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO neondb_owner;

-- Optional: ensure any new connections default to public
ALTER ROLE neondb_owner 
SET search_path = public;