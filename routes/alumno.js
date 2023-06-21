const express = require('express');
const alumno = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

alumno.post('/loginA', async (req, res, next) => {
  const { email, contrasenia } = req.body;
  let query = `SELECT * FROM usuarios WHERE email = '${email}'`;
  query += ` AND contraseña = '${contrasenia}';`;
  const rows = await db.query(query);

  if (email && contrasenia) {
    if (rows.length === 1) {
      const token = jwt.sign({
        id: rows[0].id,
        email: rows[0].email
      }, "debubkey");
      return res.status(200).json({ code: 200, message: `${token}` })
    } else { return res.status(200).json({ code: 401, message: "Correo y/o Contraseña Incorrecto" }) }
  }

  return res.status(500).json({ code: 500, message: "Incomplete values" });
});

alumno.get('/listaCursosA=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const query = `Select c.nombre_clase, c.descripcion FROM clases c, inscripciones i WHERE i.id_usuario = ${id} && i.id_clase = c.id;`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

alumno.post('/inscribirse', async (req, res, next) => {
  const { id_usuario, id_clase, codigo } = req.body;
  if (id_usuario && id_clase && codigo) {
    let queryVerifInsc = `SELECT * FROM inscripciones WHERE id_usuario = '${id_usuario}' AND id_clase = ${id_clase};`;
    const inscrito = await db.query(queryVerifInsc);
    if (inscrito.length < 0) {
      let queryCodigo = `SELECT codigo FROM clases WHERE id = ${id_clase}`;
      const codigoClase = await db.query(queryCodigo);
      if (codigoClase[0].codigo == codigo) {
        let queryUltimoId = `SELECT MAX(id) as max FROM inscripciones;`;
        const ultimoId = await db.query(queryUltimoId);
        let query = `INSERT INTO inscripciones(id, id_usuario, id_clase) `;
        query += `VALUES ('${ultimoId[0].max + 1}', '${id_usuario}', '${id_clase}');`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
          return res.status(201).json({ code: 201, message: "Alumno inscrito correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
      }
      return res.status(500).json({ code: 500, message: "Codigo de la clase incorrecto" });
    }
    return res.status(500).json({ code: 500, message: "Ya estas inscrito" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

alumno.get('/infoMateria', async function (req, res, next) {
  const idClase = parseInt(req.query.idClase, 10);
  const idUsuario = parseInt(req.query.idUsuario, 10);

  if (isNaN(idClase) || isNaN(idUsuario)) {
    return res.status(400).json({ code: 404, message: "Los parámetros deben ser números" })
  }

  let query = 'SELECT c.nombre_clase, c.descripcion ';
  query += ` FROM clases AS c`;
  query += ` INNER JOIN inscripciones AS i ON c.id = i.id_clase`;
  query += ` WHERE c.id = ${idClase}`;
  query += ` AND i.id_usuario = ${idUsuario}`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

alumno.get('/tareas', async (req, res, next) => {
  const idClase = parseInt(req.query.idClase, 10);
  const idUsuario = parseInt(req.query.idUsuario, 10);

  if (isNaN(idClase) || isNaN(idUsuario)) {
    return res.status(400).json({ code: 404, message: "Los parámetros deben ser números" })
  }

  let query = `SELECT t.titulo_de_la_tarea FROM tareas AS t`;
  query += ` INNER JOIN inscripciones AS i ON t.id_clase = i.id_clase`;
  query += ` WHERE t.id_clase = ${idClase}`;
  query += ` AND i.id_usuario = ${idUsuario};`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

alumno.get('/infoTarea', async (req, res, next) => {
  const idClase = parseInt(req.query.idClase, 10);
  const idUsuario = parseInt(req.query.idUsuario, 10);
  const idTarea = parseInt(req.query.idTarea, 10);

  if (isNaN(idClase) || isNaN(idUsuario) || isNaN(idTarea)) {
    return res.status(400).json({ code: 404, message: "Los parámetros deben ser números" })
  }

  let query = `SELECT t.titulo_de_la_tarea, t.descripcion FROM tareas AS t`;
  query += ` INNER JOIN inscripciones AS i ON t.id_clase = i.id_clase`;
  query += ` WHERE t.id_clase = ${idClase}`;
  query += ` AND i.id_usuario = ${idUsuario};`;
  query += ` AND t.id = ${idTarea};`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

alumno.post('/subirTarea', async (req, res, next) => {
  const { id_tarea, fecha, url_repo, id_estudiante } = req.body;
  if (id_tarea && fecha) {
    let queryUltimoId = `SELECT MAX(id) as max FROM entrega_de_tareas;`;
    const ultimoId = await db.query(queryUltimoId);
    let query = `INSERT INTO entrega_de_tareas(id, id_tarea, fecha, url_repo, id_estudiante) `;
    query += `VALUES ('${ultimoId[0].max + 1}', '${id_tarea}', '${fecha}', '${url_repo}', '${id_estudiante}');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Tarea agregada correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

alumno.get('/retroalimentacion', async (req, res, next) => {
  const idTarea = req.query.idTarea;
  const idEstudiante = req.query.idEstudiante;
  let query = `Select retroalimentacion FROM entrega_de_tareas WHERE id_tarea = ${idTarea} AND id_estudiante = ${idEstudiante};`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

module.exports = alumno;