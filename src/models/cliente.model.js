const db = require('../config/db');

const Cliente = {

    getAllClientes: (callback) => {
        db.query('SELECT * FROM cese_cliente ORDER BY nombre', callback);
    },

    findByCedula: (cedula, callback) => {
        db.query('SELECT * FROM cese_cliente WHERE cedula = ?', [cedula], callback);
    },

    createCliente: (clienteData, callback) => {
        db.query('INSERT INTO cese_cliente (cedula, nombre, telefono, direccion) VALUES (?, ?, ?, ?)', [clienteData.cedula, clienteData.nombre, clienteData.telefono, clienteData.direccion], callback);
    },

    getClienteById: (idcliente, callback) => {
        db.query('SELECT * FROM cese_cliente WHERE idcliente = ?', [idcliente], callback);
    },

    updateCliente: (idcliente, clienteData, callback) => {
        db.query('UPDATE cese_cliente SET cedula = ?, nombre = ?, telefono = ?, direccion = ? WHERE idcliente = ?', [clienteData.cedula, clienteData.nombre, clienteData.telefono, clienteData.direccion, idcliente], callback);
    },

    deleteCliente: (idcliente, callback) => {
        db.query('UPDATE cese_cliente SET estado = 0 WHERE idcliente = ?', [idcliente], callback);
    },

    activarCliente: (idcliente, callback) => {
        db.query('UPDATE cese_cliente SET estado = 1 WHERE idcliente = ?', [idcliente], callback);
    }

}; 

module.exports = Cliente;