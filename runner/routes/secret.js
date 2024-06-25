import Router from 'express';
import { createUserSecret, getAllSecretsByUserId, deleteSecretById } from '../controllers/secret.js';
import { createSecretValidator, getAllSecretsValidator, deleteSecretValidator } from '../validators/secret.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/', createSecretValidator, validateResult, createUserSecret);
router.get('/', getAllSecretsValidator, validateResult, getAllSecretsByUserId);
router.delete('/:userId/:secretId', deleteSecretValidator, validateResult, deleteSecretById);

export default router;
