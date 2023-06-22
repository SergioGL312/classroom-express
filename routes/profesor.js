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
  const query = `Select e.id, u.nombre FROM entrega_de_tareas e, usuarios u WHERE e.id_estudiante = u.id && e.id_tarea = ${id};`;
  const rows = await db.query(query);
  if (rows.length > 0) {
    return res.status(200).json({ code: 200, message: rows });
  }
  return res.status(404).json({ code: 404, message: "No hay tareas entregadas." });
});

profe.get('/archivosId=:id([0-9]{1,3})', async (req, res, next) => {
  const id = req.params.id;
  const tamanio = await db.query(`SELECT count(*) AS "size" FROM entrega_de_tareas;`);
  if (id >= 1 && id <= tamanio[0].size) {
    const curso = await db.query(`SELECT u.nombre, e.archivos_adjuntos FROM entrega_de_tareas e, usuarios u WHERE u.id = '${id}';`);
    return res.status(200).json({ code: 200, message: curso });
  }
  return res.status(404).json({ code: 404, message: "Archivo encontrado" });
});

function generarCodigo() {
  const codigo = randomstring.generate({
    length: 6,
    charset: 'alphanumeric'
  });
  return codigo;
}

module.exports = profe;