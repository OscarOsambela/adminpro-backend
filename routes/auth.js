//Ruta: /api/login

const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post(
    "/",
    [

      check("email", "El email es obligatorio").not().isEmpty().isEmail(),
      check("password", "El password es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    login
  );

module.exports = router;
