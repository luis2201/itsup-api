const Configuracion = require('../models/configuracion.model');
const { validationResult } = require('express-validator');

const ConfiguracionController = {

    getAllConfiguraciones: (req, res) => {
        Configuracion.getAllConfiguraciones((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener configuraciones' });
            }
            return res.json(results);
        });
    },

    createConfiguracion: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { idperiodo, idcarrera, iddocente, horas_requeridas } = req.body;

        // Verificar si ya existe configuración para ese periodo
        Configuracion.findByPeriodo(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar configuración existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe una configuración para este periodo.' });
            }

            // Si no existe, crear nueva configuración
            Configuracion.createConfiguracion({ idperiodo, idcarrera, iddocente, horas_requeridas }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la configuración' });
                }
                return res.status(201).json({ message: 'Configuración creada exitosamente' });
            });
        });
    },

    getConfiguracionById: (req, res) => {
        const { id } = req.params;

        Configuracion.getConfiguracionById(id, (err, result) => {
            return res.json(result[0]);
        });
    },

    updateConfiguracion: (req, res) => {
        const { id } = req.params;
        const { idperiodo, idcarrera, iddocente, horas_requeridas } = req.body;
console.log("ID recibido para actualizar:", id);
console.log("Datos recibidos para actualizar:", req.body);

        // Verificar si ya existe una configuración con ese idperiodo, pero con ID distinto
        Configuracion.findByPeriodo(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar configuración existente' });
            }
console.log("Resultado de la búsqueda por periodo:", result);
console.log("Resultado encontrado:", result && result.length > 0 ? result[0].id : 'No encontrado');
console.log("ID de configuración actual:", id);
console.log("ID de configuración encontrado:", result[0].id);
            if (result && result.length > 0 && result[0].id != id) {
                return res.status(400).json({ message: 'Ya existe una configuración para este periodo.' });
            }

            Configuracion.updateConfiguracion(id, { idperiodo, idcarrera, iddocente, horas_requeridas }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la configuración' });
                }

                res.json({ message: 'Configuración actualizada exitosamente' });
            });

        });
    },

    deleteConfiguracion: (req, res) => {
        const { id } = req.params;

        Configuracion.deleteConfiguracion(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la configuración' });
            }
            return res.json({ message: 'Configuración eliminada exitosamente' });
        });
    },

    activarConfiguracion: (req, res) => {
        const { id } = req.params;

        Configuracion.activarConfiguracion(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar la configuración' });
            }
            return res.json({ message: 'Configuración activada exitosamente' });
        });
    }

};

module.exports = ConfiguracionController;
