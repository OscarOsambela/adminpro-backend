const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.js");
const Usuario = require("../models/usuarios");
const Hospital = require("../models/hospital");
const Medico = require("../models/medicos");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  //find({}) filtra solo la busqueda case sensitive
  //cambiar filtro para que no se case sensitive
  const regex = new RegExp(busqueda, "i");
  const [usuario, hospital, medico] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
  ]);

  try {
    res.json({
      ok: true,
      usuario,
      hospital,
      medico,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Hable con el administrador",
    });
  }
};

const getTodoColleccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  //find({}) filtra solo la busqueda case sensitive
  //cambiar filtro para que no se case sensitive
  const regex = new RegExp(busqueda, "i");

  let data = [];
  switch (tabla) {
    case "medicos":
      data = Medico.find({ nombre: regex })
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img')
      break;
    case "hospitales":
      data = Hospital.find({ nombre: regex })
      .populate('usuario', 'nombre img')
      break; 
    case "usuarios":
     data = Usuario.find({ nombre: regex })
          break;
    default:
      res.status(400).json({
        ok: false,
        msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
      })
  }
  res.json({
    ok: true,
    resultados: data
  })

};

module.exports = {
  getTodo,
  getTodoColleccion,
};
