import Router from 'express';
import { checkWorkflows, triggerWorkflows } from '../controllers/workflow.js';
import { checkWorkflowsValidator, triggerWorkflowsValidator } from '../validators/workflowValidator.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/check', checkWorkflowsValidator, validateResult, checkWorkflows);
router.post('/trigger', triggerWorkflowsValidator, validateResult, triggerWorkflows);

export default router;
