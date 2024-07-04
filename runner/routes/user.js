import Router from 'express';
import { signUp, signIn } from '../controllers/user.js';
import { signUpValidator } from '../validators/user.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/signup', signUpValidator, validateResult, signUp);
router.post('/signin', signUpValidator, validateResult, signIn);

export default router;
