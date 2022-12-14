//Ruta: /api/todo/:busquedas

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getTodo, getTodoColleccion } = require("../controllers/busquedas");
const router = Router();

router.get("/:busqueda",validarJWT, getTodo);
router.get("/coleccion:/tabla/:busqueda",validarJWT, getTodoColleccion);


module.exports = router;
