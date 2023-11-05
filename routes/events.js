/* 
  Events Routes 
  /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fieldValidators } = require('../middlewares/field-validators');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
    fieldValidators,
  ],
  createEvent
);

// Actualizar un evento
router.put('/:id', updateEvent);

// Eliminar un evento
router.delete('/:id', deleteEvent);

module.exports = router;
