import { body, query, param } from 'express-validator';

export const createSecretValidator = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('name').notEmpty().withMessage('name is required'),
  body('value').notEmpty().withMessage('value is required')
];

export const getAllSecretsValidator = [
  query('userId').notEmpty().withMessage('userId is required')
];

export const deleteSecretValidator = [
  param('userId').notEmpty().withMessage('userId is required'),
  param('secretId').notEmpty().withMessage('secretId is required')
];

export const patchSecretValidator = [
  param('secretId').notEmpty().withMessage('secretId is required'),
  body('name').notEmpty().withMessage('name is required'),
  body('value').notEmpty().withMessage('value is required')
];
