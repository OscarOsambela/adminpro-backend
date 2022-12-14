//Ruta: /api/usuarios

const { Router } = require("express");
const {
  getUsuarios,
  crearUsuarios,
  actualizarUsuarios,
  borrarUsuarios,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getUsuarios);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuarios
);
router.put(
  "/:id",
  validarJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuarios
);
router.delete("/:id", validarJWT, borrarUsuarios);
module.exports = router;
