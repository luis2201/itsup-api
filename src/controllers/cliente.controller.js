const Cliente = require('../models/cliente.model');
const { validationResult } = require('express-validator');

const ClienteController = {

    getAllClientes: (req, res) => {
        Cliente.getAllClientes((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener clientes' });
            }
            return res.json(results);
        });
    },

    createCliente: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { cedula, nombre, telefono, direccion } = req.body;
        
        Cliente.findByCedula(cedula, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar cliente existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe un cliente con esta cédula.' });
            }

            // Si no existe, crear nuevo cliente
            Cliente.createCliente({ cedula, nombre, telefono, direccion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el cliente' });
                }
                return res.status(201).json({ message: 'Cliente creado exitosamente' });
            });
        });        
    },

    getClienteById: (req, res) => {
        const { id } = req.params;

        Cliente.getClienteById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener cliente' });
            }
            return res.json(result[0]);
        });
    },

    updateCliente: (req, res) => {
        const { id } = req.params;
        const { cedula, nombre, telefono, direccion } = req.body;

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        Cliente.findByCedula(cedula, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar cliente existente' });
            }

            if (result && result.length > 0 && result[0].idcliente !== parseInt(id)) {
                return res.status(400).json({ message: 'Ya existe un cliente con esta cédula.' });
            }

            // Si no existe, actualizar cliente
            Cliente.updateCliente(id, { cedula, nombre, telefono, direccion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el cliente' });
                }
                return res.json({ message: 'Cliente actualizado exitosamente' });
            });
        });        
    },

    deleteCliente: (req, res) => {
        const { id } = req.params;

        Cliente.deleteCliente(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el cliente' });
            }
            return res.json({ message: 'Cliente eliminado exitosamente' });
        });
    },

    activarCliente: (req, res) => {
        const { id } = req.params;

        Cliente.activarCliente(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el cliente' });
            }
            return res.json({ message: 'Cliente activado exitosamente' });
        });
    }

};

module.exports = ClienteController;
