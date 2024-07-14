import { createCommand, getAllCommandsWithUserId, deleteCommand, patchCommand } from '../models/commandHub.js';

export async function createCommandHub(req, res) {
  try {
    const { userId } = req.params;
    const { scenario, commands } = req.body;
    const commandId = await createCommand(userId, scenario, commands);
    res.status(201).json({ id: commandId });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function getAllCommandsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const commands = await getAllCommandsWithUserId(userId);
    res.status(200).json({ commands });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function patchCommandById(req, res) {
  try {
    const { userId, commandId } = req.params;
    const { scenario, commands } = req.body;
    await patchCommand(userId, commandId, scenario, commands);
    res.status(200).json({ message: 'Command updated successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function deleteCommandById(req, res) {
  try {
    const { userId, commandId } = req.params;
    await deleteCommand(userId, commandId);
    res.status(200).json({ message: 'Command deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
