import Router from 'express';
import { createUserSecret } from '../controllers/secret.js';
import { createSecretValidator } from '../validators/secret.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/', createSecretValidator, validateResult, createUserSecret);

export default router;
