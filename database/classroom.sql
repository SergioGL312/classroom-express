-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2023 a las 04:20:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `classroom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`id`, `id_tarea`, `id_estudiante`, `calificacion`) VALUES
(1, 1, 2, 11),
(2, 1, 3, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id` int(11) NOT NULL,
  `nombre_clase` varchar(50) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `codigo` varchar(10) NOT NULL,
  `id_profesor_a_cargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id`, `nombre_clase`, `descripcion`, `codigo`, `id_profesor_a_cargo`) VALUES
(1, 'POO', 'Programación Orientada a Objetos', '23bj5k', 1),
(2, 'P', 'des', 'JmgrVr', 1),
(3, 'Pp', 'desgf', 'vvzblF', 1),
(4, 'in', 'gds', 'WOSdvz', 1),
(5, 'rwe', 'rwe', 'UYTolA', 1),
(6, 'pruebadeprueba', 'pruebaprueba', 'zNrbLV', 1),
(7, 'pruebapruebaprueba', 'pruebapruebaprueba', 't00uhq', 1),
(8, 'interfaz', 'in', 'rFYAbu', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega_de_tareas`
--

CREATE TABLE `entrega_de_tareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `url_repo` varchar(255) DEFAULT NULL,
  `id_estudiante` int(11) DEFAULT NULL,
  `retroalimentacion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entrega_de_tareas`
--

INSERT INTO `entrega_de_tareas` (`id`, `id_tarea`, `fecha`, `url_repo`, `id_estudiante`, `retroalimentacion`) VALUES
(4, 3, '2023-06-23 02:10:12', 'https://github.com/SergioGL312/Quiz-Server-Java-Interfaces', 3, 'postman'),
(5, 1, '2023-06-23 02:10:29', 'https://github.com/SergioGL312/Quiz-Server-JAva', 2, ''),
(6, 1, '2023-06-24 23:53:54', 'https://github.com/SergioGL312/Quiz-Server-Java-Interfaces', 3, 'grfdfg'),
(7, 2, '2023-06-23 02:11:22', 'https://github.com/SergioGL312/Quiz-Server-Java-Interfaces', 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_clase` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id`, `id_usuario`, `id_clase`) VALUES
(1, 2, 1),
(2, 3, 1),
(3, 3, 2),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `titulo_de_la_tarea` varchar(50) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `fecha_de_vencimento` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `valor` int(11) NOT NULL,
  `id_clase` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `titulo_de_la_tarea`, `descripcion`, `fecha_de_vencimento`, `valor`, `id_clase`) VALUES
(1, 'prueba', 'sf', '2023-06-18 05:59:00', 100, 1),
(2, 'prueba2', 'sf', '2023-06-23 05:59:00', 100, 1),
(3, 'inte', 'inte', '2023-06-21 18:40:00', 100, 1),
(4, 'int2 clase 2', 'int2 clase 2', '2023-06-21 18:41:00', 100, 2),
(5, 't2', 't2', '2023-06-21 18:42:00', 100, 2),
(6, 't1', 't1', '2023-06-16 19:22:00', 1, 1),
(7, 't1', 't1', '2023-06-16 19:22:00', 1, 1),
(8, 'asf', 'fas', '2023-07-06 23:48:00', 100, 1),
(9, 'tarea 1prueba', 'prueba', '2023-06-23 19:15:00', 100, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contraseña`, `rol`) VALUES
(1, 'Sergio', 's@gmail.com', '1234', 'profesor'),
(2, 'Iker', 'i@gmail.com', '1234', 'alumno'),
(3, 'Orla', 'o@gmail.com', '1234', 'alumno'),
(4, 'admin', 'admin@gmail.com', 'admin', 'admin'),
(5, 'Pablo', 'p@gmail.com', '1234', 'profesor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_profesor_a_cargo` (`id_profesor_a_cargo`);

--
-- Indices de la tabla `entrega_de_tareas`
--
ALTER TABLE `entrega_de_tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_estudiante`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_clase` (`id_clase`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);

--
-- Filtros para la tabla `clases`
--
ALTER TABLE `clases`
  ADD CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`id_profesor_a_cargo`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `entrega_de_tareas`
--
ALTER TABLE `entrega_de_tareas`
  ADD CONSTRAINT `entrega_de_tareas_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `entrega_de_tareas_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
