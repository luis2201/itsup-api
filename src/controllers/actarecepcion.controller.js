const ActaRecepcion = require('../models/actarecepcion.model');
const { validationResult } = require('express-validator');

const ActaRecepcionController = {

    getAllActas: (req, res) => {
        ActaRecepcion.getAllActas((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener actas de recepción' });
            }
            return res.json(results);
        });
    },

    createActa: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fecha, hora, idequipo, idcliente, idinscripcion, diagnostico } = req.body;

        ActaRecepcion.findByEquipoFechaHora(idequipo, fecha, hora, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar acta existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe un acta de recepción para este equipo en esta fecha y hora.' });
            }

            // Si no existe, crear nueva acta
            ActaRecepcion.createActa({ fecha, hora, idequipo, idcliente, idinscripcion, diagnostico }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el acta de recepción' });
                }
                return res.status(201).json({ message: 'Acta de recepción creada exitosamente' });
            });
        });
    },

    getActaById: (req, res) => {
        const { id } = req.params;

        ActaRecepcion.getActaById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el acta de recepción' });
            }
            return res.json(result[0]);
        });
    },

    updateActa: (req, res) => {
        const { id } = req.params;
        const { fecha, hora, idequipo, idcliente, idinscripcion, diagnostico } = req.body;

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        ActaRecepcion.findByEquipoFechaHora(idequipo, fecha, hora, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar acta existente' });
            }

            if (result && result.length > 0 && result[0].idacta !== parseInt(id)) {
                return res.status(400).json({ message: 'Ya existe un acta de recepción para este equipo en esta fecha y hora.' });
            }

            // Si no existe, actualizar acta
            ActaRecepcion.updateActa(id, { fecha, hora, idequipo, idcliente, idinscripcion, diagnostico }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el acta de recepción' });
                }
                return res.json({ message: 'Acta de recepción actualizada exitosamente' });
            });
        });
    },

    deleteActa: (req, res) => {
        const { id } = req.params;

        ActaRecepcion.deleteActa(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el acta de recepción' });
            }
            return res.json({ message: 'Acta de recepción eliminada exitosamente' });
        });
    },

    activarActa: (req, res) => {
        const { id } = req.params;

        ActaRecepcion.activarActa(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el acta de recepción' });
            }
            return res.json({ message: 'Acta de recepción activada exitosamente' });
        });
    }   

};

module.exports = ActaRecepcionController;
