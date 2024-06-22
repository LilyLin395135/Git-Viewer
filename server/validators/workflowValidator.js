import { body } from 'express-validator';

export const checkWorkflowsValidator = [
  body('commands').isArray().withMessage('commands must be an array').notEmpty().withMessage('commands are required'),
  body('folderPath').notEmpty().withMessage('folderPath is required')
];

export const triggerWorkflowsValidator = [
  body('event').notEmpty().withMessage('event is required'),
  body('folderPath').notEmpty().withMessage('folderPath is required')
];
