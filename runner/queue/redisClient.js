import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL
});

// 建立 Redis 客戶端
redisClient.on('connect', () => console.log('Redis client connected'));
redisClient.on('error', (err) => console.error('Redis client Error', err));
redisClient.connect(); // 新版需要呼叫 connect()

export default redisClient;
