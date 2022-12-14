const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarios.js");
const { generarJWT } = require("../helpers/jwt.js");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuariosDB = await Usuario.findOne({ email });
    //verificar email
    if (!usuariosDB) {
      return res.status(400).json({
        ok: false,
        msg: "Email no es válido",
      });
    }
    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuariosDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no es válida",
      });
    }

    //generar Token JWT
    const token = await generarJWT(usuariosDB.id)

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
