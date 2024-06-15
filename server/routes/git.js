import Router from 'express';
import { initGit, getGitBranchesInfo } from '../controllers/git.js';
import { gitInitValidator, gitGetBranchInfoValidator } from '../validators/gitValidator.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/git/init', gitInitValidator, validateResult, initGit);

router.get('/git/allBranchesInfo', gitGetBranchInfoValidator, validateResult, getGitBranchesInfo);

export default router;
