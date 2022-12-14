//Ruta: /api/medicos

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require("../controllers/medicos");
const router = Router();

router.get("/", getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El nombre del hospital es necesario").not().isEmpty(),
    //validar un id de mongo válido
    check("nombre", "El nombre del médico es necesario").isMongoId(),

    validarCampos,
  ],
  crearMedicos
);

router.put(
  "/:id",
  [
  ],
  actualizarMedicos
);

router.delete("/:id", borrarMedicos);

module.exports = router;