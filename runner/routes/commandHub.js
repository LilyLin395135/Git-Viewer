import Router from 'express';
import { createCommandHub, getAllCommandsByUserId, deleteCommandById, patchCommandById } from '../controllers/commandHub.js';

const router = Router();

router.post('/user/:userId/commands', createCommandHub);
router.get('/user/:userId/commands', getAllCommandsByUserId);
router.patch('/user/:userId/commands/:commandId', patchCommandById);
router.delete('/user/:userId/commands/:commandId', deleteCommandById);

export default router;
