const mongoose = require("mongoose");
require('dotenv').config()

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error("Fallo la conexión a la base de datos");
  }
};
module.exports = {
    dbConection
}