import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";
import { connectRedis } from "./utils/redis.client";

const PORT = Number(process.env.PORT) || 3000;

async function startApp() {
  try {
    await AppDataSource.initialize();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startApp();
