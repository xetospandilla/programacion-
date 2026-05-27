-- Actualizamos un dato:
update Persona set apellidos = 'Cubells Perez' where dni = '12345678Z';

-- Borramos una fila ( DESMATRICULAMOS DE UNA ASIGNATURA ):
delete from Matricula where dni = '12345678Z' and codigo = '13929';

-- Borramos una tabla entera ( DROP )
-- drop table Asignatura;