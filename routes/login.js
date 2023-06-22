const express = require('express');
const login = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');

login.post('/', async (req, res, next) => {
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
      return res.status(200).json({ code: 200, message: { "token": `${token}`, "rol": `${rows[0].rol}`, "id": `${rows[0].id}` } })
    } else { return res.status(200).json({ code: 401, message: "Correo y/o Contraseña Incorrecto" }) }
  }

  return res.status(500).json({ code: 500, message: "Incomplete values" });
});

module.exports = login;