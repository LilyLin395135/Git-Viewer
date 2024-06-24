import { body } from 'express-validator';

export const triggerWorkflowsValidator = [
  body('event').notEmpty().withMessage('event is required'),
  body('ymlContent').notEmpty().withMessage('ymlContent is required'),
  body('repoUrl').notEmpty().withMessage('repoUrl is required')
];
