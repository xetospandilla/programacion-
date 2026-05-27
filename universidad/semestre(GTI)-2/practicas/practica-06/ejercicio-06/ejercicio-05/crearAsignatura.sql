-- crearAsignatura.sql

create table Asignatura(
    codigo char(8) not null,
    nombre varchar(50) not null,
    primary key (codigo)
);

-- Insertamos las asignaturas:
insert into Asignatura values ('13928','Programacion 1');
insert into Asignatura values ('13929','Programacion 2');
insert into Asignatura values ('13898','Algebra'); 