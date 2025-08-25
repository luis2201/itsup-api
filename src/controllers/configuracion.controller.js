const Configuracion = require('../models/configuracion.model');
const { validationResult } = require('express-validator');

const ConfiguracionController = {

    // Obtener todas las configuraciones
    getAllConfiguraciones: (req, res) => {
        Configuracion.getAllConfiguraciones((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener configuraciones' });
            }
            return res.json(results);
        });
    },

    // Crear una nueva configuración
    createConfiguracion: (req, res) => {
        const errors = validationResult(req);
        
        // Validar los datos de entrada
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extraer los datos del cuerpo de la solicitud
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

    // Obtener configuración por ID
    getConfiguracionById: (req, res) => {
        const { id } = req.params;

        Configuracion.getConfiguracionById(id, (err, result) => {
            return res.json(result[0]);
        });
    },

    // Actualizar una configuración
    updateConfiguracion: (req, res) => {
        const { id } = req.params;
        const { idperiodo, idcarrera, iddocente, horas_requeridas } = req.body;

        // Verificar si ya existe una configuración con ese idperiodo, pero con ID distinto
        Configuracion.findByPeriodo(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar configuración existente' });
            }
            if (result && result.length > 0 && result[0].idconfiguracion != id) {
                return res.status(400).json({ message: 'Ya existe una configuración para este periodo.' });
            }

            // Si no hay conflictos, proceder a actualizar
            Configuracion.updateConfiguracion(id, { idperiodo, idcarrera, iddocente, horas_requeridas }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la configuración' });
                }

                res.json({ message: 'Configuración actualizada exitosamente' });
            });

        });
    },

    // Eliminar una configuración (marcar como inactiva)
    deleteConfiguracion: (req, res) => {
        const { id } = req.params;

        Configuracion.deleteConfiguracion(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la configuración' });
            }
            return res.json({ message: 'Configuración eliminada exitosamente' });
        });
    },

    // Activar una configuración
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
