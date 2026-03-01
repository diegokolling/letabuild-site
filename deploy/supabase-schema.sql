-- Executar no Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- Tabela principal
create table if not exists habit_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Row Level Security: cada usuario so acessa seus dados
alter table habit_data enable row level security;

create policy "Users can read own data"
  on habit_data for select
  using (auth.uid() = user_id);

create policy "Users can insert own data"
  on habit_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update own data"
  on habit_data for update
  using (auth.uid() = user_id);
