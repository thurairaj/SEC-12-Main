-- Run this file once to set up the database schema.
--
-- Usage:
--   psql -d todo_app -f db/schema.sql
--
-- Or paste it directly into psql / pgAdmin.

CREATE TABLE IF NOT EXISTS todos (
  id          SERIAL      PRIMARY KEY,
  title       TEXT        NOT NULL,
  description TEXT        NOT NULL DEFAULT '',
  priority    TEXT        NOT NULL DEFAULT 'medium'
                          CHECK (priority IN ('low', 'medium', 'high')),
  category    TEXT        NOT NULL DEFAULT 'General',
  due_date    TEXT        NOT NULL DEFAULT '',
  completed   BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
