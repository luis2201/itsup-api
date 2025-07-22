const db = require('../config/db');

const Configuracion = {

    getAllConfiguraciones: (callback) => {
        db.query("SELECT * FROM cese_configuracion", (callback));}

};

module.exports = Configuracion;
