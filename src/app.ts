import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";
import { createDev } from "./logics/developers/createDev.logic";

const app: Application = express();
app.use(express.json());

app.post("/developers", createDev);

export default app;
