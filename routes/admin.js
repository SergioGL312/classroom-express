const express = require('express');
const admin = express.Router();
const db = require('../config/db');

admin.post('/nuevoUsuario', async (req, res, next) => {
  const { nombre, email, contrasenia, rol } = req.body;
  if (nombre && email && contrasenia && rol) {
    let queryUltimoId = `SELECT MAX(id) as max FROM usuarios;`;
    const ultimoId = await db.query(queryUltimoId);
    let query = `INSERT INTO usuarios(id, nombre, email, contraseña, rol) VALUES ('${ultimoId[0].max + 1}','${nombre}','${email}','${contrasenia}','${rol}');`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(201).json({ code: 201, message: "Usuario agregado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Ocurrio un error" });
  }
  return res.status(500).json({ code: 500, message: "Valores incompletos" });
});

module.exports = admin;