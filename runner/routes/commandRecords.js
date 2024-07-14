import Router from 'express';
import { createRecord, getRecordsByUserId } from '../controllers/commandRecords.js';

const router = Router();

router.post('/', createRecord);
router.get('/user/:userId', getRecordsByUserId);

export default router;
