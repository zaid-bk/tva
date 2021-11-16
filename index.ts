import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import knex from "./src/db/Knex";
import { Model } from "objection";
import violations from "./src/routes/Violations"

Model.knex(knex);

const app = express();
const port = 9000;

// middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server has Started on http://localhost:${port}`);
});

app.get("/", (_, res) => {
  res.send("Hello Zaid Welcome to Server");
});

// route
app.use("/violations", violations)

export default app;
