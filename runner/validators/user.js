import { body } from 'express-validator';

export const signUpValidator = [
  body('email').notEmpty().withMessage('email is required'),
  body('password').notEmpty().withMessage('password is required')
];
