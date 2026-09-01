-- Protyaborton 2026 — isolated registration table
-- Apply only to an approved Supabase project for this event.
-- Do not run against unrelated BKS / Puja / JKL production databases without approval.

CREATE TABLE IF NOT EXISTS public.protyaborton_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  participant_type text NOT NULL,
  organisation text,
  channel_or_publication text,
  district text,
  city text NOT NULL,
  role_or_designation text,
  website_or_social text,
  interest_area text[] NOT NULL DEFAULT '{}',
  attendance_confirmation text NOT NULL,
  consent boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'protyaborton-2026-web',
  status text NOT NULL DEFAULT 'received',
  notes text,
  other_participant_type text,
  submitter_ip_hash text,
  mobile_normalized text GENERATED ALWAYS AS (
    regexp_replace(mobile, '[^0-9]', '', 'g')
  ) STORED,
  email_normalized text GENERATED ALWAYS AS (lower(trim(email))) STORED,
  CONSTRAINT protyaborton_registrations_consent_required CHECK (consent = true),
  CONSTRAINT protyaborton_registrations_participant_type_check CHECK (
    participant_type IN (
      'agri_digital_creator',
      'youtuber',
      'rural_vlogger',
      'journalist',
      'media_editor',
      'other'
    )
  ),
  CONSTRAINT protyaborton_registrations_attendance_check CHECK (
    attendance_confirmation = 'yes'
  ),
  CONSTRAINT protyaborton_registrations_status_check CHECK (
    status IN ('received', 'reviewed', 'cancelled')
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS protyaborton_registrations_email_unique
  ON public.protyaborton_registrations (email_normalized);

CREATE UNIQUE INDEX IF NOT EXISTS protyaborton_registrations_mobile_unique
  ON public.protyaborton_registrations (mobile_normalized);

CREATE INDEX IF NOT EXISTS protyaborton_registrations_created_at_idx
  ON public.protyaborton_registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS protyaborton_registrations_ip_hash_created_idx
  ON public.protyaborton_registrations (submitter_ip_hash, created_at DESC)
  WHERE submitter_ip_hash IS NOT NULL;

ALTER TABLE public.protyaborton_registrations ENABLE ROW LEVEL SECURITY;

-- No public read/write policies. Inserts occur via service-role API only.

COMMENT ON TABLE public.protyaborton_registrations IS
  'Protyaborton 2026 Agri-Creators & Media Conclave registrations — isolated from other BKS events.';
