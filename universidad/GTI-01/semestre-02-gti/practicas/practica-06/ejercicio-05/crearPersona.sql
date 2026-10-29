-- crearPersona.sql
create table Persona (
dni char(9) not null,
nombre varchar(20) not null,
apellidos varchar(80) not null,
primary key (dni)
);

-- Inserto mis datos:
insert into Persona values ('35612207L', 'Carlos', 'Galan Cubells')