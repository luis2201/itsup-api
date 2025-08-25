const db = require('../config/db');

const ActaRecepcion = {

    getAllActas: (callback) => {
        db.query('SELECT * FROM cese_acta_recepcion', callback);
    },

    findByEquipoFechaHora: (idequipo, fecha, hora, callback) => {
        db.query('SELECT * FROM cese_acta_recepcion WHERE idequipo = ? AND fecha = ? AND hora = ? AND estado = 1', [idequipo, fecha, hora], callback);
    },

    createActa: (actaData, callback) => {
        db.query('INSERT INTO cese_acta_recepcion (fecha, hora, idequipo, idcliente, idinscripcion, diagnostico) VALUES (?, ?, ?, ?, ?, ?)', 
            [actaData.fecha, actaData.hora, actaData.idequipo, actaData.idcliente, actaData.idinscripcion, actaData.diagnostico], callback);
    },

    getActaById: (id, callback) => {
        db.query('SELECT * FROM cese_acta_recepcion WHERE idacta = ? AND estado = 1', [id], callback);
    },

    updateActa: (id, actaData, callback) => {
        db.query('UPDATE cese_acta_recepcion SET fecha = ?, hora = ?, idequipo = ?, idcliente = ?, idinscripcion = ?, diagnostico = ? WHERE idacta = ? AND estado = 1', 
            [actaData.fecha, actaData.hora, actaData.idequipo, actaData.idcliente, actaData.idinscripcion, actaData.diagnostico, id], callback);
    },

    deleteActa: (idacta, callback) => {
        db.query('UPDATE cese_acta_recepcion SET estado = 0 WHERE idacta = ?', [idacta], callback);
    },

    activarActa: (idacta, callback) => {
        db.query('UPDATE cese_acta_recepcion SET estado = 1 WHERE idacta = ?', [idacta], callback);
    }

};

module.exports = ActaRecepcion;