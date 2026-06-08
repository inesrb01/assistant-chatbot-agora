begin;

create extension if not exists pgcrypto;
create extension if not exists vector;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'message_role') then
    create type message_role as enum ('user', 'assistant', 'system');
  end if;

  if not exists (select 1 from pg_type where typname = 'appointment_mode') then
    create type appointment_mode as enum ('online', 'phone', 'in-person');
  end if;

  if not exists (select 1 from pg_type where typname = 'appointment_status') then
    create type appointment_status as enum ('received', 'confirmed', 'cancelled', 'completed');
  end if;
end $$;

----------------------------------------------------
-- ROLES
----------------------------------------------------

create table if not exists roles (
  id text primary key,
  label text not null,
  description text,
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- DEPARTMENTS
----------------------------------------------------

create table if not exists departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- PROGRAMS
----------------------------------------------------

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  department_id uuid not null references departments(id),
  name text not null,
  code text not null unique,
  description text,
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- USERS
----------------------------------------------------

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  name text not null,
  email text not null unique,
  role_id text not null references roles(id),
  program_id uuid references programs(id),
  password_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- STUDENT PROFILE
----------------------------------------------------

create table if not exists student_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references app_users(id) on delete cascade,
  student_number text unique,
  semester text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- SERVICES
----------------------------------------------------

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- APPOINTMENTS
----------------------------------------------------

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id),
  service_id uuid references services(id),
  appointment_date timestamptz not null,
  mode appointment_mode not null,
  status appointment_status not null default 'received',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- CONVERSATIONS
----------------------------------------------------

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id),
  title text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- MESSAGES
----------------------------------------------------

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role message_role not null,
  content text not null,
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- DOCUMENTS
----------------------------------------------------

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_name text,
  file_url text,
  uploaded_by uuid references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- DOCUMENT ROLES
----------------------------------------------------

create table if not exists document_roles (
  document_id uuid not null references documents(id) on delete cascade,
  role_id text not null references roles(id) on delete cascade,
  primary key (document_id, role_id)
);

----------------------------------------------------
-- DOCUMENT CHUNKS
----------------------------------------------------

create table if not exists document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

----------------------------------------------------
-- KNOWLEDGE ITEMS
----------------------------------------------------

create table if not exists knowledge_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  content text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

----------------------------------------------------
-- KNOWLEDGE ITEM ROLES
----------------------------------------------------

create table if not exists knowledge_item_roles (
  knowledge_item_id uuid not null references knowledge_items(id) on delete cascade,
  role_id text not null references roles(id) on delete cascade,
  primary key (knowledge_item_id, role_id)
);

----------------------------------------------------
-- KNOWLEDGE TAGS
----------------------------------------------------

create table if not exists knowledge_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

----------------------------------------------------
-- KNOWLEDGE ITEM TAGS
----------------------------------------------------

create table if not exists knowledge_item_tags (
  knowledge_item_id uuid not null references knowledge_items(id) on delete cascade,
  tag_id uuid not null references knowledge_tags(id) on delete cascade,
  primary key (knowledge_item_id, tag_id)
);

----------------------------------------------------
-- KNOWLEDGE ACTIONS
----------------------------------------------------

create table if not exists knowledge_actions (
  id uuid primary key default gen_random_uuid(),
  knowledge_item_id uuid not null references knowledge_items(id) on delete cascade,
  label text not null,
  url text not null,
  position integer not null default 1,
  unique (knowledge_item_id, label, url)
);

----------------------------------------------------
-- MESSAGE DOCUMENTS
----------------------------------------------------

create table if not exists message_documents (
  message_id uuid not null references messages(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  primary key (message_id, document_id)
);

----------------------------------------------------
-- MESSAGE DOCUMENT CHUNKS
----------------------------------------------------

create table if not exists message_document_chunks (
  message_id uuid not null references messages(id) on delete cascade,
  chunk_id uuid not null references document_chunks(id) on delete cascade,
  primary key (message_id, chunk_id)
);

----------------------------------------------------
-- MESSAGE SOURCES
----------------------------------------------------

create table if not exists message_sources (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  source_type text not null,
  source_reference text not null,
  created_at timestamptz not null default now()
);

commit;