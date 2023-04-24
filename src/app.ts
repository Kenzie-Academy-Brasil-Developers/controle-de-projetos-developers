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
import {
  ensureEmailExists,
  ensureIdDevExists,
  verifyInfoDevExists,
  verifyOS,
} from "./middleware/developers.middlewares";
import { listDevAndProjects } from "./logics/developers/listDevAndProjects.logic";
import {
  ensureDeveloperInProject,
  verifyProjectExists,
} from "./middleware/projects.middlewares";

const app: Application = express();
app.use(express.json());

app.get("/developers/:id", ensureIdDevExists, listDevAndProjects);
app.post("/developers", ensureEmailExists, createDev);
app.patch("/developers/:id", ensureIdDevExists, updateDev);
app.delete("/developers/:id", ensureIdDevExists, deleteDev);
app.post(
  "/developers/:id/infos",
  ensureIdDevExists,
  verifyInfoDevExists,
  verifyOS,
  createInfoDev
);

app.post(
  "/projects",
  ensureIdDevExists,
  ensureDeveloperInProject,
  createProject
);
app.get("/projects/:id", verifyProjectExists, listProjectById);
app.patch(
  "/projects/:id",
  ensureIdDevExists,
  verifyProjectExists,
  ensureDeveloperInProject,
  updateProject
);
app.delete("/projects/:id", verifyProjectExists, deleteProject);
app.post("/projects/:id/technologies", verifyProjectExists, addTechInProject);
app.delete(
  "/projects/:id/technologies/:name",
  verifyProjectExists,
  deleteTechinProject
);

export default app;
