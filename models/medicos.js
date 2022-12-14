const { Schema, model } = require("mongoose");

const MedicoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId, //relacion de este esquema con usuarios
      ref: "Usuario",
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId, //relacion de este esquema con usuarios
      ref: "Hospital",
      required: true,
    },
  },
  { collection: "medicos" }
); //renombrar nombre de BD
//quitar parametros por defecto del mongoDB
MedicoSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Medico", MedicoSchema);
