import { body, query, param } from 'express-validator';

export const gitInitValidator = [
  body('folderPath').notEmpty().withMessage('folderPath is required')
];

export const gitGetBranchInfoValidator = [
  query('folderPath').notEmpty().withMessage('folderPath is required')
];
