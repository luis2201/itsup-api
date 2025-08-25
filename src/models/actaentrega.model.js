const db = require('../config/db');

const ActaEntrega = {

    getAllActas: (callback) => {
        db.query('SELECT * FROM cese_acta_entrega', callback);
    },

    findByEquipoFechaHora: (idequipo, fecha, hora, callback) => {

        db.query(
            'SELECT * FROM cese_acta_entrega WHERE idequipo = ? AND fecha = ? AND hora = ?',
            [idequipo, fecha, hora],
            callback
        );
    },

    createActa: (actaData, callback) => {
        const { fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion } = actaData;
        db.query(
            'INSERT INTO cese_acta_entrega (fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion) VALUES (?, ?, ?, ?, ?, ?)',
            [actaData.fecha, actaData.hora, actaData.idequipo, actaData.idcliente, actaData.idinscripcion, actaData.detalle_reparacion],
            callback
        );
    },

    getActaById: (id, callback) => {
        db.query('SELECT * FROM cese_acta_entrega WHERE idacta = ?', [id], callback);
    },

    updateActa: (id, actaData, callback) => {
        const { fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion } = actaData;
        db.query(
            'UPDATE cese_acta_entrega SET fecha = ?, hora = ?, idequipo = ?, idcliente = ?, idinscripcion = ?, detalle_reparacion = ? WHERE idacta = ?',
            [actaData.fecha, actaData.hora, actaData.idequipo, actaData.idcliente, actaData.idinscripcion, actaData.detalle_reparacion, id],
            callback
        );
    },

    deleteActa: (id, callback) => {
        db.query('UPDATE cese_acta_entrega SET estado = 0 WHERE idacta = ?', [id], callback);
    },

    activarActa: (id, callback) => {
        db.query('UPDATE cese_acta_entrega SET estado = 1 WHERE idacta = ?', [id], callback);
    }

};

module.exports = ActaEntrega;