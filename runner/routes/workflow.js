import Router from 'express';
import { triggerWorkflows } from '../controllers/workflow.js';
import { triggerWorkflowsValidator } from '../validators/workflow.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/trigger', triggerWorkflowsValidator, validateResult, triggerWorkflows);

export default router;
