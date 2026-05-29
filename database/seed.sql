----------------------------------------------------
-- ROLES
----------------------------------------------------

insert into roles (id, label, description) values
('student', 'Étudiant', 'Accès étudiant'),
('teacher', 'Enseignant', 'Accès enseignant'),
('staff', 'Personnel', 'Accès administratif')
on conflict (id) do nothing;

----------------------------------------------------
-- DEPARTMENTS
----------------------------------------------------

insert into departments (id, name, description) values

(
'10000000-0000-0000-0000-000000000001',
'Technologies de l''information',
'Département informatique'
),

(
'10000000-0000-0000-0000-000000000002',
'Administration',
'Département administration'
)

on conflict (id) do nothing;

----------------------------------------------------
-- PROGRAMS
----------------------------------------------------

insert into programs
(id, department_id, name, code, description)
values

(
'11000000-0000-0000-0000-000000000001',
'10000000-0000-0000-0000-000000000001',
'Techniques de l''informatique',
'420AA',
'Programme informatique'
),

(
'11000000-0000-0000-0000-000000000002',
'10000000-0000-0000-0000-000000000001',
'Développement Web',
'420DW',
'Développement web et mobile'
)

on conflict (code) do nothing;

----------------------------------------------------
-- APP_USERS
----------------------------------------------------

insert into app_users
(id, legacy_id, name, email, role_id, program_id)
values

(
'13000000-0000-0000-0000-000000000001',
'ETU001',
'Marie Dubois',
'marie.dubois@college.ca',
'student',
'11000000-0000-0000-0000-000000000001'
),

(
'13000000-0000-0000-0000-000000000002',
'ENS001',
'Jean Tremblay',
'jean.tremblay@college.ca',
'teacher',
'11000000-0000-0000-0000-000000000001'
),

(
'13000000-0000-0000-0000-000000000003',
'ADM001',
'Sophie Martin',
'sophie.martin@college.ca',
'staff',
null
)

on conflict (email) do nothing;

----------------------------------------------------
-- SERVICES
----------------------------------------------------

insert into services
(id, name, description)
values

(
'12000000-0000-0000-0000-000000000001',
'Registrariat',
'Services administratifs'
),

(
'12000000-0000-0000-0000-000000000002',
'Soutien TI',
'Support informatique'
),

(
'12000000-0000-0000-0000-000000000003',
'Aide pédagogique',
'Accompagnement étudiant'
)

on conflict (name) do nothing;

----------------------------------------------------
-- STUDENT_PROFILES
----------------------------------------------------

insert into student_profiles
(id, user_id, student_number, semester)
values
(
'14000000-0000-0000-0000-000000000001',
'13000000-0000-0000-0000-000000000001',
'20240001',
'Hiver 2026'
)
on conflict (student_number) do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000005'::uuid, id
from knowledge_tags
where name in (
'bibliotheque',
'ressource',
'article',
'livre',
'tutorat',
'pedagogique'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000006'::uuid, id
from knowledge_tags
where name in (
'rendez-vous',
'registrariat',
'conseiller',
'orientation',
'aide'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000007'::uuid, id
from knowledge_tags
where name in (
'confidentialite',
'donnees',
'securite',
'ia',
'limite'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000008'::uuid, id
from knowledge_tags
where name in (
'enseignant',
'presence',
'plan de cours',
'classe'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000005'::uuid, id
from knowledge_tags
where name in (
  'bibliotheque',
  'ressource',
  'article',
  'livre',
  'tutorat',
  'pedagogique'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000006'::uuid, id
from knowledge_tags
where name in (
  'rendez-vous',
  'registrariat',
  'conseiller',
  'orientation',
  'aide'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000007'::uuid, id
from knowledge_tags
where name in (
  'confidentialite',
  'donnees',
  'securite',
  'ia',
  'limite'
)
on conflict do nothing;

insert into knowledge_item_tags (knowledge_item_id, tag_id)
select '20000000-0000-0000-0000-000000000008'::uuid, id
from knowledge_tags
where name in (
  'enseignant',
  'presence',
  'plan de cours',
  'classe'
)
on conflict do nothing;