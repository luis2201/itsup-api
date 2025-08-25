const Asistencia = require('../models/asistencia.model');
const { validationResult } = require('express-validator');

const AsistenciaController = {

    getAllAsistencias: (req, res) => {
        Asistencia.getAllAsistencias((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener asistencias' });
            }
            return res.json(results);
        });
    },

    createAsistencia: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { idinscripcion, fecha, hora_entrada, hora_salida } = req.body;

        Asistencia.findByFecha({ idinscripcion, fecha }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar asistencia existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe una asistencia para este estudiante.' });
            }

            // Si no existe, crear nueva asistencia
            Asistencia.createAsistencia({ idinscripcion, fecha, hora_entrada, hora_salida }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la asistencia' });
                }
                return res.status(201).json({ message: 'Asistencia creada exitosamente' });
            });
        });
    },

    getAsistenciaById: (req, res) => {
        const { id } = req.params;

        Asistencia.getAsistenciaById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener asistencia' });
            }
            return res.json(result[0]);
        });
    },

    updateAsistencia: (req, res) => {
        const { id } = req.params;
        const { idinscripcion, fecha, hora_entrada, hora_salida } = req.body;

        Asistencia.findByFecha({ idinscripcion, fecha }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar asistencia existente' });
            }

            if (result && result.length > 0 && result[0].idasistencia !== parseInt(id)) {
                return res.status(400).json({ message: 'Ya existe una asistencia para este estudiante en esta fecha.' });
            }

            // Si no existe o es la misma, actualizar asistencia
            Asistencia.updateAsistencia(id, { idinscripcion, fecha, hora_entrada, hora_salida }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la asistencia' });
                }
                return res.json({ message: 'Asistencia actualizada exitosamente' });
            });
        });
    },

    deleteAsistencia: (req, res) => {
        const { id } = req.params;

        Asistencia.deleteAsistencia(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la asistencia' });
            }
            return res.json({ message: 'Asistencia eliminada exitosamente' });
        });
    },

    activarAsistencia: (req, res) => {
        const { id } = req.params;

        Asistencia.activarAsistencia(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar la asistencia' });
            }
            return res.json({ message: 'Asistencia activada exitosamente' });
        });
    },


};

module.exports = AsistenciaController;