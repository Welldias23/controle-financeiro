create database controle_financeiro;

create table users (
  id serial primary key,
  name varchar(20) not null,
  lastname varchar(20),
  email varchar(30) not null,
  password varchar not null
);


create table cards_credit_debit (
  id serial primary key,
  id_user integer references users(id) not null,
  invoice_due_date date,
  card_limit int,
  name_card varchar(10) not null
);

create table card_shopping (
  id serial primary key,
  id_card integer references cards_credit_debit(id) not null,
  credit boolean not null,
  value_total int not null,
  installments int,
  installment_value int,
  purchase_date timestamp not null,
  Type varchar(20) not null
);