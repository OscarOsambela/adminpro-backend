const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuarios.js");
const { generarJWT } = require("../helpers/jwt.js");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  //paginacion
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email").skip(desde).limit(5),
    Usuario.count(),
  ]);
  res.json({ 
    ok: true,
    usuarios,
    total,
    uid: req.uid,
  });
};

const crearUsuarios = async (req, res = response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const emailDuplicate = await Usuario.findOne({ email });
    if (emailDuplicate) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar usuario
    await usuario.save();
    //generar Token JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, revisar logs",
    });
  }
};

const actualizarUsuarios = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }
    //actualizaciones
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar",
    });
  }
};

const borrarUsuarios = async (req, res) => {
  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error de eliminación",
    });
  }
};
module.exports = {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuarios,
};

//instalar npm i express-validator
//validaciones semiautomaticas en las rutas
//aplicarlo en usuarios.js / routes
