import express from 'express';
import dotenv from 'dotenv';
import workflowRouter from './routes/workflow.js';
import secretRouter from './routes/secret.js';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/workflow', workflowRouter);
app.use('/api/secret', secretRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
  });
}

export default app;
