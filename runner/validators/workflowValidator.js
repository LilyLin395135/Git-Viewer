import { body } from 'express-validator';

export const triggerWorkflowsValidator = [
  body('event').notEmpty().withMessage('event is required'),
  body('ymlContent').notEmpty().withMessage('folderPath is required')
];
