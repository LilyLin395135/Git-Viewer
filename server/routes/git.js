import Router from 'express';
import { initGit } from '../controllers/git.js';
import { gitInitValidator } from '../validators/gitInitValidator.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/init', gitInitValidator, validateResult, initGit);

export default router;
