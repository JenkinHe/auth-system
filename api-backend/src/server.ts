import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(console.error);
