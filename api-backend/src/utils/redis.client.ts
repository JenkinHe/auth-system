import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || "redis"; // service name in docker-compose
const redisPort = process.env.REDIS_PORT || "6379";

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    console.log("try to connect");
    await redisClient.connect();
  }
  return redisClient;
}

export default redisClient;
