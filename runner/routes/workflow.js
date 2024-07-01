import Router from 'express';
import { triggerWorkflows, getWorkflowLogs, createWorkflowAndProject, getWorkflowsByUser, getWorkflowById } from '../controllers/workflow.js';
import { triggerWorkflowsValidator, getWorkflowLogsValidator, createWorkflowValidator, getWorkflowsByUserValidator, getWorkflowByIdValidator } from '../validators/workflow.js';
import validateResult from '../middleware/validatorHandler.js';

const router = Router();

router.post('/trigger', triggerWorkflowsValidator, validateResult, triggerWorkflows);
router.get('/logs/:containerName', getWorkflowLogsValidator, validateResult, getWorkflowLogs);
router.post('/', createWorkflowValidator, validateResult, createWorkflowAndProject);
router.get('/user/:userId', getWorkflowsByUserValidator, validateResult, getWorkflowsByUser);
router.get('/workflow/:workflowId', getWorkflowByIdValidator, validateResult, getWorkflowById);

export default router;
