-- cosulta3.sql
select Persona.nombre, Persona.apellidos
from Persona
inner join Matricula on Persona.dni = Matricula.dni
inner join Asignatura on Matricula.codigo = Asignatura.codigo
where Asignatura.nombre = 'Programacion 2';