const db = require('../config/db');

const Carrera = {

    getAllCarreras: (callback) => {
        db.query('SELECT * FROM tb_carrera ORDER BY carrera', callback);
    },

    findByCarrera: (carreraData, callback) => {
        db.query('SELECT * FROM tb_carrera WHERE carrera = ?', [carreraData], callback);
    },

    createCarrera: (carreraData, callback) => {
        const { carrera } = carreraData;

        db.query('INSERT INTO tb_carrera (carrera) VALUES (?)', [carrera], callback);
    },

    getCarreraById: (idcarrera, callback) => {
        db.query('SELECT * FROM tb_carrera WHERE idcarrera = ?', [idcarrera], callback);
    },

    updateCarrera: (idcarrera, carreraData, callback) => {
        const { carrera } = carreraData;

        db.query('UPDATE tb_carrera SET carrera = ? WHERE idcarrera = ?', [carrera, idcarrera], callback);
    },

    deleteCarrera: (idcarrera, callback) => {
        db.query('UPDATE tb_carrera SET estado = 0 WHERE idcarrera = ?', [idcarrera], callback);
    },

    activarCarrera: (idcarrera, callback) => {
        db.query('UPDATE tb_carrera SET estado = 1 WHERE idcarrera = ?', [idcarrera], callback);
    }
};

module.exports = Carrera;