import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = Number(process.env.PORT) || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(console.error);
