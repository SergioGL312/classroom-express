CREATE TABLE `usuarios` (
    `id` int(11) NOT NULL PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `email` varchar(50) NOT NULL,
    `contraseña` varchar(100) NOT NULL,
    `rol` varchar(50) NOT NULL
);

CREATE TABLE `clases` (
    `id` int(11) NOT NULL PRIMARY KEY,
    `nombre_clase` varchar(50) NOT NULL,
    `descripcion` varchar(50),
    `codigo` varchar(10) NOT NULL,
    `id_profesor_a_cargo` int(11) NOT NULL
);

ALTER TABLE clases
ADD FOREIGN KEY (id_profesor_a_cargo) REFERENCES usuarios(id);

CREATE TABLE `tareas` (
    `id` int(11) NOT NULL PRIMARY KEY,
    `titulo_de_la_tarea` varchar(50) NOT NULL,
    `descripcion` varchar(50),
    `fecha_de_vencimento` TIMESTAMP,
    `valor` int(11) NOT NULL
);

ALTER TABLE tareas
ADD id_clase int(11);

ALTER TABLE tareas
ADD FOREIGN KEY (`id_clase`) REFERENCES clases(id);


CREATE TABLE `entrega_de_tareas` (
    `id` int(11) NOT NULL PRIMARY KEY,
    `id_tarea`  int(11) NOT NULL,
    `id_estudiante` int(11) NOT NULL,
    `fecha` TIMESTAMP NOT NULL,
    `archivos_adjuntos` longblob
);

ALTER TABLE entrega_de_tareas
ADD retroalimentacion varchar(200);

-- ALTER TABLE entrega_de_tareas
-- ADD id_usuario int(11);

ALTER TABLE entrega_de_tareas
ADD FOREIGN KEY (`id_estudiante`) REFERENCES usuarios(id);

ALTER TABLE entrega_de_tareas
ADD FOREIGN KEY (`id_tarea`) REFERENCES tareas(id);

CREATE TABLE `calificaciones` (
    `id` int(11) NOT NULL PRIMARY KEY,
    `id_tarea` int(11) NOT NULL,
    `id_estudiante` int(11) NOT NULL,
    `calificacion` int(11)
);

ALTER TABLE calificaciones
ADD FOREIGN KEY (`id_tarea`) REFERENCES tareas(id);

CREATE TABLE inscripciones (
    id int(11) NOT NULL PRIMARY KEY,
    id_usuario int(11) NOT NULL,
    id_clase int(11) NOT NULL
);

ALTER TABLE inscripciones
ADD FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id);

ALTER TABLE inscripciones
ADD FOREIGN KEY (`id_clase`) REFERENCES clases(id);

-- INSERT

-- USUARIOS

INSERT INTO `usuarios`(`id`, `nombre`, `email`, `contraseña`, `rol`) VALUES (1,'Sergio','s@gmail.com','1234','profesor');

INSERT INTO `usuarios`(`id`, `nombre`, `email`, `contraseña`, `rol`) VALUES (2,'Iker','i@gmail.com','1234','alumno');
INSERT INTO `usuarios`(`id`, `nombre`, `email`, `contraseña`, `rol`) VALUES (3,'Orla','o@gmail.com','1234','alumno');

-- CLASES

INSERT INTO `clases`(`id`, `nombre_clase`, `descripcion`, `codigo`, `id_profesor_a_cargo`) VALUES (1,'POO','Programación Orientada a Objetos','23bj5k','1');

-- INSCRIPCIONES

INSERT INTO `inscripciones`(`id`, `id_usuario`, `id_clase`) VALUES ('1','2','1');
INSERT INTO `inscripciones`(`id`, `id_usuario`, `id_clase`) VALUES ('2','3','1');