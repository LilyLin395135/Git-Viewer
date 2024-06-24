import Router from 'express';
import { signUp } from '../controllers/user.js';
import { signUpValidator } from '../validators/user.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/', signUpValidator, validateResult, signUp);

export default router;
