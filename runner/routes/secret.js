import Router from 'express';
import { createUserSecret, getAllSecretsByUserId, deleteSecretById, patchSecretById } from '../controllers/secret.js';
import { createSecretValidator, getAllSecretsValidator, deleteSecretValidator, patchSecretValidator } from '../validators/secret.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/', createSecretValidator, validateResult, createUserSecret);
router.get('/', getAllSecretsValidator, validateResult, getAllSecretsByUserId);
router.delete('/:userId/:secretId', deleteSecretValidator, validateResult, deleteSecretById);
router.patch('/:secretId', patchSecretValidator, validateResult, patchSecretById);

export default router;
