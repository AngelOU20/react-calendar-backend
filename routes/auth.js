/* 
  Rutas de Usuario / Auth
  host + /api/auth
*/

/* Importaciones */
const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  loginUser,
  revalidateToken,
} = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/field-validators');

const router = Router();

router.post(
  '/new',
  [
    /* Middlewares */
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 carácteres').isLength({
      min: 6,
    }),
    /* Validación con express-validator */
    fieldValidators,
  ],
  createUser
);

router.post(
  '/',
  [
    /* Middlewares */
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 carácteres').isLength({
      min: 6,
    }),
    fieldValidators,
  ],
  loginUser
);

router.get('/renew', revalidateToken);

module.exports = router;
