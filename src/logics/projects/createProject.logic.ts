import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  IProject,
  TProjectRequest,
} from "../../interfaces/interfaces.projects";

const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dataProject: Partial<TProjectRequest> = req.body;

  const queryString: string = format(
    `
        INSERT INTO
            projects(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(dataProject),
    Object.values(dataProject)
  );

  const queryResult: QueryResult<IProject> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export { createProject };
