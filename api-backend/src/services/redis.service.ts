import redisClient from "../utils/redis.client";
import { hashRefreshToken } from "../utils/token.util";

export class RedisService {
  constructor() {}

  async storeRefreshToken(userId: string, refreshToken: string, expiresInDays: number) {
    const key = `refreshToken:${hashRefreshToken(refreshToken)}`;
    const ttlSeconds = expiresInDays * 24 * 60 * 60;

    await redisClient.set(key, userId, { EX: ttlSeconds });
  }

  async verifyRefreshToken(refreshToken: string) {
    const key = `refreshToken:${hashRefreshToken(refreshToken)}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      throw new Error("Refresh token invalid or expired");
    }

    return userId;
  }

  async revokeRefreshToken(refreshToken: string) {
    const key = `refreshToken:${hashRefreshToken(refreshToken)}`;
    await redisClient.del(key);
  }
}
