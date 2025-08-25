const db = require('../config/db');

const Equipo = {

    getAllEquipos: (callback) => {
        db.query('SELECT * FROM cese_equipo', callback);
    },
    
    findByNumeroSerie: (numero_serie, callback) => {
        db.query('SELECT * FROM cese_equipo WHERE numero_serie = ?', [numero_serie], callback);
    },

    createEquipo: (equipoData, callback) => {
        db.query('INSERT INTO cese_equipo (marca, modelo, numero_serie, descripcion) VALUES (?, ?, ?, ?)', [equipoData.marca, equipoData.modelo, equipoData.numero_serie, equipoData.descripcion], callback);
    },

    getEquipoById: (idequipo, callback) => {
        db.query('SELECT * FROM cese_equipo WHERE idequipo = ?', [idequipo], callback);
    },

    updateEquipo: (idequipo, equipoData, callback) => {
        db.query('UPDATE cese_equipo SET marca = ?, modelo = ?, numero_serie = ?, descripcion = ? WHERE idequipo = ?', [equipoData.marca, equipoData.modelo, equipoData.numero_serie, equipoData.descripcion, idequipo], callback);
    },

    deleteEquipo: (idequipo, callback) => {
        db.query('UPDATE cese_equipo SET estado = 0 WHERE idequipo = ?', [idequipo], callback);
    },
    
    activarEquipo: (idequipo, callback) => {
        db.query('UPDATE cese_equipo SET estado = 1 WHERE idequipo = ?', [idequipo], callback);
    }
    
};

module.exports = Equipo;