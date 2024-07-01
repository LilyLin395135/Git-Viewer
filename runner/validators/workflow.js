import { body, param } from 'express-validator';

export const triggerWorkflowsValidator = [
  body('event').notEmpty().withMessage('event is required'),
  body('ymlContent').notEmpty().withMessage('ymlContent is required'),
  body('repoUrl').notEmpty().withMessage('repoUrl is required')
];

export const getWorkflowLogsValidator = [
  param('containerName').notEmpty().withMessage('containerName is required')
];

export const createWorkflowValidator = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('ymlContent').notEmpty().withMessage('ymlContent is required'),
  body('workflowFileName').notEmpty().withMessage('workflowFileName is required'),
  body('projectFolderName').notEmpty().withMessage('projectFolderName is required'),
  body('commitHash').notEmpty().withMessage('commitHash is required'),
  body('commitMessage').notEmpty().withMessage('commitMessage is required'),
  body('triggerEvent').notEmpty().withMessage('triggerEvent is required'),
  body('repoUrl').notEmpty().withMessage('repoUrl is required')
];

export const getWorkflowsByUserValidator = [
  param('userId').notEmpty().withMessage('userId is required')
];

export const getWorkflowByIdValidator = [
  param('workflowId').notEmpty().withMessage('workflowId is required')
];
