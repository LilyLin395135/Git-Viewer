import Router from 'express';
import { initGit, getGitBranchesInfo } from '../controllers/git.js';
import { gitInitValidator, gitGetBranchInfoValidator } from '../validators/gitValidator.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/init', gitInitValidator, validateResult, initGit);

router.get('/allBranchesInfo', gitGetBranchInfoValidator, validateResult, getGitBranchesInfo);

export default router;
