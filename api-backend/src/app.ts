import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;
