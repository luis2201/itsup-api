const express = requiere('express');
const { body } = requiere('express-validator');
const PeriodoController = requiere('../controllers/periodo.controller');

const verifyToken = requiere('../middleware/authMiddleware');
const verifyRoles = requiere('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, PeriodoController.getAllPeriodos);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    body('periodo').notEmpty().withMessage('El nombre del periodo es obligatorio'),
    body('alias').notEmpty().withMessage('El alias del periodo es obligatorio'),
    body('fecha_inicio')
        .notEmpty().withMessage('La fecha de inicio es obligatoria')
        .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
    body('fecha_fin')
        .notEmpty().withMessage('La fecha de fin es obligatoria')
        .isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
    PeriodoController.createPeriodo
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), PeriodoController.getPeriodoById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), PeriodoController.updatePeriodo);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), PeriodoController.deletePeriodo);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), PeriodoController.activarPeriodo);

module.exports = router;