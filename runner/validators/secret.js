import { body } from 'express-validator';

export const createSecretValidator = [
  body('userId').notEmpty().withMessage('userId is required'),
  body('ec2SshKey').notEmpty().withMessage('ec2SshKey is required'),
  body('ec2Username').notEmpty().withMessage('ec2Username is required'),
  body('ec2HostDns').notEmpty().withMessage('ec2HostDns is required')
];
