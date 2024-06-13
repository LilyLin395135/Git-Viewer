import { body } from 'express-validator';

export const gitInitValidator = [
  body('folderPath').notEmpty().withMessage('folderPath is required')
];
