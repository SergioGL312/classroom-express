const express = require('express');
const profe = express.Router();
const db = require('../config/db');
const randomstring = require('randomstring');

profe.get('/listaCursos', async (req, res, next) => {
  const query = "Select * FROM clases;";
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
      return res.status(200).json({code: 200, message: curso});
  }
  return res.status(404).json({code: 404, message: "Curso no encontrado" });
}); 


const generarCodigo = () => {
  const codigo = randomstring.generate({
    length: 6,
    charset: 'alphanumeric'
  });
  return codigo;
};

module.exports = profe;