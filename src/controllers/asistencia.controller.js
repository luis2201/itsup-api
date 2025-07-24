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

        const { idperiodo, idinscripcion, fecha, hora_entrada, hora_salida } = req.body;

        Asistencia.findByIdInscripcion(idinscripcion, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar asistencia existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe una asistencia para este estudiante.' });
            }

            // Si no existe, crear nueva asistencia
            Asistencia.createAsistencia({ idperiodo, idinscripcion, fecha, hora_entrada, hora_salida }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la asistencia' });
                }
                return res.status(201).json({ message: 'Asistencia creada exitosamente' });
            });
        });
    },
