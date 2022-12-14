const { response } = require("express")
const Hospital = require('../models/hospital')

const getHospitales = async(req, res = response)=>{
    const hospital = await Hospital.find().populate('usuario', 'nombre');
    res.json({
      ok: true,
      hospital,
    });
}

const crearHospitales = async(req, res = response)=>{
    const uid = req.uid
    const hospital = new Hospital({usuario: uid,...req.body})
    try {
        const hospitalDB = await hospital.save()
        res.json({
            ok: true,
            hospitalDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })    
    }

}

const actualizarHospitales = (req, res = response)=>{
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const borrarHospitales = (req, res = response)=>{
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}
