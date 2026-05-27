-- crearAsignatura.sql

create table Asignaturas(
    codigo char(8) not null,
    nombre varchar(50) not null,
    primary key (codigo)
);

-- Insertamos las asignaturas:
insert into Asignaturas values ('13928','Programacion 1');
insert into Asignaturas values ('s','Programacion 2');
insert into Asignaturas values ('13898','Algebra'); 