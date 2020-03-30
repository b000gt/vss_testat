\set user vss_user
\set password '\'123456789\''
\set database happyface

DROP DATABASE IF EXISTS :database;

DROP USER IF EXISTS :user;
CREATE USER :user WITH PASSWORD :password;

CREATE DATABASE :database WITH OWNER=:user ENCODING='UTF8';

\echo 'CREATED USER [':user'] with password [':password'] and DATABASE [':database']'

\c :database :user
\encoding 'UTF8'

\ir faces.sql
\ir clicks.sql
\ir inserts.sql