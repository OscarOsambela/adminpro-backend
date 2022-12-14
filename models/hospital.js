const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,//relacion de este esquema con usuarios
        ref: 'Usuario'
    }
}, {collection: 'hospitales'});//renombrar nombre de BD
//quitar parametros por defecto del mongoDB
HospitalSchema.method('toJSON', function(){
  const {__v, ...object} = this.toObject()
  return object
})

module.exports = model( 'Hospital', HospitalSchema );
