import { createCommandRecord, getAllCommandRecordsByUserId } from '../models/commandRecords.js';

export async function createRecord(req, res) {
  try {
    const { userId, executedAt, commands, results } = req.body;
    const recordId = await createCommandRecord(userId, executedAt, commands, results);
    res.status(201).json({ id: recordId });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function getRecordsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const records = await getAllCommandRecordsByUserId(userId);
    res.status(200).json({ records });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
