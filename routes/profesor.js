const express = require('express');
const profe = express.Router();
const db = require('../config/db');
const randomstring = require('randomstring');

profe.get('/listaCursos=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const query = `Select id, nombre_clase FROM clases WHERE id_profesor_a_cargo = ${id};`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

profe.post('/crearCurso', async (req, res, next) => {
  const { nombre_clase, descripcion } = req.body;
  if (nombre_clase && descripcion) {
    let queryUltimoId = `SELECT MAX(id) as max FROM clases;`;
    const ultimoId = await db.query(queryUltimoId);
    let query = `INSERT INTO clases (id, nombre_clase, descripcion, codigo, id_profesor_a_cargo) `;
    query += `VALUES ('${ultimoId[0].max + 1}', '${nombre_clase}', '${descripcion}', '${generarCodigo()}', '1');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Curso agregado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

profe.get('/curso=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const tamanio = await db.query(`SELECT count(*) AS "size" FROM clases;`);
  if (id >= 1 && id <= tamanio[0].size) {
    const curso = await db.query(`SELECT * FROM clases WHERE id = '${id}';`);
    return res.status(200).json({ code: 200, message: curso });
  }
  return res.status(404).json({ code: 404, message: "Curso no encontrado" });
});

profe.get('/tareas=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const query = `Select id, titulo_de_la_tarea FROM tareas WHERE id_clase = ${id};`;
  const rows = await db.query(query);
  return res.status(200).json({ code: 200, message: rows });
});

profe.post('/crearTarea', async (req, res, next) => {
  const { titulo, descripcion, valor, fecha_de_vencimiento, id } = req.body;
  if (titulo && fecha_de_vencimiento && valor) {
    let queryUltimoId = `SELECT MAX(id) as max FROM tareas;`;
    const ultimoId = await db.query(queryUltimoId);
    let query = `INSERT INTO tareas(id, titulo_de_la_tarea, descripcion, fecha_de_vencimento, valor, id_clase) `;
    query += `VALUES ('${ultimoId[0].max + 1}', '${titulo}', '${descripcion}', '${fecha_de_vencimiento}', '${valor}', '${id}');`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Tarea agregado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

profe.get('/tareasAlumnosNombres=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const query = `Select e.id, e.id_tarea, u.nombre, e.id_estudiante FROM entrega_de_tareas e, usuarios u WHERE e.id_estudiante = u.id && e.id_tarea = ${id};`;
  const rows = await db.query(query);
  if (rows.length > 0) {
    return res.status(200).json({ code: 200, message: rows });
  }
  return res.status(404).json({ code: 404, message: "No hay tareas entregadas." });
});

profe.get('/archivosId', async (req, res, next) => {
  const idUsuario = req.query.idUsuario;
  const idTarea = req.query.idTarea;
  const tamanio = await db.query(`SELECT count(*) AS "size" FROM entrega_de_tareas;`);
  if (idUsuario >= 1 && idUsuario <= tamanio[0].size) {
    const curso = await db.query(`SELECT u.nombre, e.url_repo FROM entrega_de_tareas e, usuarios u WHERE u.id = '${idUsuario}' AND e.id = ${idTarea};`);
    return res.status(200).json({ code: 200, message: curso });
  }
  return res.status(404).json({ code: 404, message: "Archivo encontrado" });
});

profe.post('/calificar', async (req, res, next) => {
  const { id_tarea, id_estudiante, calificacion } = req.body;
  if (id_tarea && id_estudiante && calificacion) {

    let queryExisteCalif = `SELECT * FROM calificaciones WHERE id_tarea = '${id_tarea}' AND id_estudiante = '${id_estudiante}';`;
    const resultExit = await db.query(queryExisteCalif);

    if (resultExit.length > 0) {
      let queryUpdareCalif = `UPDATE calificaciones SET calificacion = '${calificacion}' WHERE id_estudiante = '${id_estudiante}' AND id_tarea = '${id_tarea}';`;
      const resQueryUpdate = await db.query(queryUpdareCalif);
      if (resQueryUpdate.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Actualizado correctamente" });
      }
      return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    } else {
      let queryUltimoId = `SELECT MAX(id) as max FROM calificaciones;`;
      const ultimoId = await db.query(queryUltimoId);
      let query = `INSERT INTO calificaciones(id, id_tarea, id_estudiante, calificacion) `;
      query += `VALUES ('${ultimoId[0].max + 1}', '${id_tarea}', '${id_estudiante}', '${calificacion}');`;

      const rows = await db.query(query);

      if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Calificacion agregada correctamente" });
      }
      return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }


  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

profe.put('/retroalimentacion', async (req, res, next) => {
  const { id_tarea, id_estudiante, retroalimentacion } = req.body;
  if (id_tarea && id_estudiante) {
    let query = `UPDATE entrega_de_tareas SET retroalimentacion = '${retroalimentacion}' WHERE id_estudiante = '${id_estudiante}' AND id_tarea = '${id_tarea}'`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Retroalimentacion agregada correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

profe.get('/califExistente', async (req, res, next) => {
  const idTarea = req.query.idTarea;
  const idEstudiante = req.query.idEstudiante;
  let queryCalifExiste = `SELECT calificacion FROM calificaciones WHERE id_tarea = ${idTarea} AND id_estudiante = ${idEstudiante};`;
  const resultCalifExi = await db.query(queryCalifExiste);
  return res.status(200).json({ code: 200, message: resultCalifExi });
});

profe.get('/retroExistente', async (req, res, next) => {
  const idTarea = req.query.idTarea;
  const idEstudiante = req.query.idEstudiante;
  let queryRetroExiste = `SELECT retroalimentacion FROM entrega_de_tareas WHERE id_tarea = ${idTarea} AND id_estudiante = ${idEstudiante};`;
  const resultCalifExi = await db.query(queryRetroExiste);
  return res.status(200).json({ code: 200, message: resultCalifExi });
});

function generarCodigo() {
  const codigo = randomstring.generate({
    length: 6,
    charset: 'alphanumeric'
  });
  return codigo;
}

module.exports = profe;