import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";
import { createDev } from "./logics/developers/createDev.logic";
import { updateDev } from "./logics/developers/updateDev.logic";
import { deleteDev } from "./logics/developers/deleteDev.logic";
import { createInfoDev } from "./logics/developers/createInfoDev.logic";
import { createProject } from "./logics/projects/createProject.logic";
import { listProjectById } from "./logics/projects/listProjectById.logic";
import { updateProject } from "./logics/projects/updateProject.logic";
import { deleteProject } from "./logics/projects/deleteProject.logic";
import { addTechInProject } from "./logics/projects/addTechInProject.logic";
import { deleteTechinProject } from "./logics/projects/deleteTechinProject.logic";

const app: Application = express();
app.use(express.json());

app.post("/developers", createDev);
app.patch("/developers/:id", updateDev);
app.delete("/developers/:id", deleteDev);
app.post("/developers/:id/infos", createInfoDev);

app.post("/projects", createProject);
app.get("/projects/:id", listProjectById);
app.patch("/projects/:id", updateProject);
app.delete("/projects/:id", deleteProject);
app.post("/projects/:id/technologies", addTechInProject);
app.delete("/projects/:id/technologies/:name", deleteTechinProject);

export default app;
