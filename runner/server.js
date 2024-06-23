import express from 'express';
import dotenv from 'dotenv';
import workflowRouter from './routes/workflow.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/workflow', workflowRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
  });
}

export default app;
