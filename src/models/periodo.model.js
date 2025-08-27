const db = require('../config/db'); 
const { findByPeriodo } = require('./configuracion.model');

const Periodo = {

    getAllPeriodos: (callback) => {
        db.query('SELECT * FROM tb_periodo ORDER BY fechainicio', callback);
    },

    findByPeriodo: (periodoData, callback) => {
        db.query('SELECT * FROM tb_periodo WHERE periodo = ? OR alias = ?', [periodoData.periodo, periodoData.alias], callback);
    },

    createPeriodo: (periodoData, callback) => {
        const { periodo, alias, fechainicio, fechafin } = periodoData;

        db.query('INSERT INTO tb_periodo (periodo, alias, fechainicio, fechafin) VALUES (?, ?, ?, ?)', [periodo, alias, fechainicio, fechafin], callback);
    },

    getPeriodoById: (idperiodo, callback) => {
        db.query('SELECT * FROM tb_periodo WHERE idperiodo = ?', [idperiodo], callback)
    },

    updatePeriodo: (idperiodo, periodoData, callback) => {
        const { periodo, alias, fechainicio, fechafin } = periodoData;

        db.query('UPDATE tb_periodo SET periodo = ?, alias = ?, fechainicio = ?, fechafin = ? WHERE idperiodo = ?', [periodo, alias, fechainicio, fechafin, idperiodo], callback);
    },

    deletePeriodo: (idperiodo, callback) => {
        db.query('UPDATE tb_periodo SET estado = 0 WHERE idperiodo = ?', [idperiodo], callback);
    },

    activarPeriodo: (idperiodo, callback) => {
        db.query('UPDATE tb_periodo SET estado = 1 WHERE idperiodo = ?', [idperiodo], callback);
    }

}

module.exports = Periodo;