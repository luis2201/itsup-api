const ActaEntrega = require('../models/actaentrega.model');
const { validationResult } = require('express-validator');
const { createActa } = require('./actarecepcion.controller');

const ActaEntregaController = {

    getAllActas: (req, res) => {
        ActaEntrega.getAllActas((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener actas de entrega' });
            }
            return res.json(results);
        });
    },

    createActa: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion } = req.body;

        ActaEntrega.findByEquipoFechaHora(idequipo, fecha, hora, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar acta existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe un acta de entrega para este equipo en esta fecha y hora.' });
            }

            // Si no existe, crear nueva acta
            ActaEntrega.createActa({ fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el acta de entrega' });
                }
                return res.status(201).json({ message: 'Acta de entrega creada exitosamente' });
            });
        });
    },  

    getActaById: (req, res) => {
        const { id } = req.params;

        ActaEntrega.getActaById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el acta de entrega' });
            }
            return res.json(result[0]);
        });
    }, 

    updateActa: (req, res) => {
        const { id } = req.params;
        const { fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        ActaEntrega.findByEquipoFechaHora(idequipo, fecha, hora, (err, result) => { 
            if (err) {
                return res.status(500).json({ error: 'Error al consultar acta existente' });
            }

            if (result && result.length > 0 && result[0].idacta !== parseInt(id)) {
                return res.status(400).json({ message: 'Ya existe un acta de entrega para este equipo en esta fecha y hora.' });
            }

            ActaEntrega.updateActa(id, { fecha, hora, idequipo, idcliente, idinscripcion, detalle_reparacion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el acta de entrega' });
                }
                return res.status(200).json({ message: 'Acta de entrega actualizada exitosamente' });
            });
        });
    },  

    deleteActa: (req, res) => {
        const { id } = req.params;

        ActaEntrega.deleteActa(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el acta de entrega' });
            }
            return res.status(200).json({ message: 'Acta de entrega eliminada exitosamente' });
        });
    }, 

    activarActa: (req, res) => {
        const { id } = req.params;

        ActaEntrega.activarActa(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el acta de entrega' });
            }
            return res.status(200).json({ message: 'Acta de entrega activada exitosamente' });
        });
    }
};

module.exports = ActaEntregaController;