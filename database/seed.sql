insert into roles (id, label, description)
values
('student', 'Étudiant', 'Accès étudiant'),
('teacher', 'Enseignant', 'Accès enseignant'),
('advisor', 'Conseiller', 'Accès services étudiants'),
('admin', 'Administrateur', 'Accès complet');

insert into departments (name, description)
values
('Informatique', 'Département informatique'),
('Gestion', 'Département gestion'),
('Marketing', 'Département marketing'),
('Sciences humaines', 'Département sciences humaines');

insert into programs (department_id, name, code, description)
select id,
       'Techniques de l''informatique',
       'INF',
       'Programme informatique'
from departments
where name = 'Informatique';

insert into services (name, description)
values
('Registrariat', 'Gestion académique'),
('Aide pédagogique', 'Soutien aux étudiants'),
('Support TI', 'Support informatique'),
('Orientation', 'Conseils et accompagnement');

insert into app_users
(name,email,role_id,is_active)
values
('Ines Rbah','ines@example.com','student',true),
('Mourad Sehbboub','mourad@example.com','teacher',true),
('Admin Demo','admin@example.com','admin',true);

insert into student_profiles
(user_id, student_number, semester, phone)
select
    id,
    '2025001',
    'Session 6',
    '514-111-1111'
from app_users
where email = 'ines@example.com';

insert into knowledge_tags (name)
values
('Admission'),
('Cours'),
('Stage'),
('Horaire'),
('Services');

insert into knowledge_items
(slug,title,category,content)
values
(
'stage-process',
'Processus de stage',
'Stage',
'Les étudiants doivent compléter leur stage avant la diplomation.'
),
(
'horaire-modification',
'Modification d horaire',
'Cours',
'Les demandes de modification doivent être soumises avant la date limite.'
),
(
'registrariat-contact',
'Contacter le registrariat',
'Services',
'Le registrariat est disponible du lundi au vendredi.'
);

insert into knowledge_item_roles
(knowledge_item_id, role_id)
select id, 'student'
from knowledge_items;

insert into knowledge_item_tags
(knowledge_item_id, tag_id)
select
    ki.id,
    kt.id
from knowledge_items ki
cross join knowledge_tags kt
where ki.slug='stage-process'
and kt.name='Stage';

insert into knowledge_actions
(knowledge_item_id,label,url)
select
    id,
    'Consulter',
    'https://lasallecollege.com'
from knowledge_items
where slug='stage-process';

insert into conversations
(user_id,title)
select
    id,
    'Questions sur les stages'
from app_users
where email='ines@example.com';

insert into messages
(conversation_id,role,content)
select
    id,
    'user',
    'Comment obtenir mon contrat de stage ?'
from conversations
where title='Questions sur les stages';

insert into messages
(conversation_id,role,content)
select
    id,
    'assistant',
    'Vous devez contacter le service des stages afin de recevoir votre contrat.'
from conversations
where title='Questions sur les stages';

insert into appointments
(
user_id,
service_id,
appointment_date,
mode,
status,
notes
)
select
    u.id,
    s.id,
    now() + interval '7 days',
    'online',
    'confirmed',
    'Discussion concernant le stage'
from app_users u
cross join services s
where u.email='ines@example.com'
and s.name='Orientation';

insert into documents
(title, description, file_name, file_url)
values
(
'Guide de stage',
'Guide complet des stages',
'guide_stage.pdf',
'/documents/guide_stage.pdf'
),
(
'Plan de cours BD',
'Plan de cours Base de données',
'plan_bd.pdf',
'/documents/plan_bd.pdf'
),
(
'Guide étudiant',
'Guide des services étudiants',
'guide_etudiant.pdf',
'/documents/guide_etudiant.pdf'
);

insert into document_roles
(document_id, role_id)
select id, 'student'
from documents;

insert into document_chunks
(document_id, chunk_index, content)
select
    id,
    1,
    'Le stage est obligatoire pour obtenir le diplôme.'
from documents
where title='Guide de stage';

insert into document_chunks
(document_id, chunk_index, content)
select
    id,
    2,
    'Le contrat de stage doit être signé avant le début du stage.'
from documents
where title='Guide de stage';

insert into document_chunks
(document_id, chunk_index, content)
select
    id,
    1,
    'Le cours couvre la modélisation relationnelle et SQL.'
from documents
where title='Plan de cours BD';

insert into message_documents
(message_id, document_id)
select
    m.id,
    d.id
from messages m
cross join documents d
where d.title='Guide de stage'
limit 1;

insert into message_document_chunks
(message_id, chunk_id)
select
    m.id,
    c.id
from messages m
cross join document_chunks c
where c.chunk_index=1
limit 1;

insert into message_sources
(message_id, source_type, source_reference)
select
    id,
    'document',
    'Guide de stage'
from messages
limit 1;





