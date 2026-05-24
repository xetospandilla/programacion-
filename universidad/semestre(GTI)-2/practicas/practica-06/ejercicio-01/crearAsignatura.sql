-- crearAsignatura.sql

create table Asignatura(
    codigo char(8) not null,
    nombre varchar(50) not null,
    primary key (codigo)
);