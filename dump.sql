create database controle_financeiro;

create table users (
  id serial primary key,
  name varchar(20) not null,
  lastname varchar(20),
  email varchar(30) not null,
  password varchar(6) not null
);
