import { QueryConfig, QueryResult } from "pg";
import { IDevelopers } from "../interfaces/interfaces.developers";
import { client } from "../database";
import { NextFunction, Request, Response } from "express";

const ensureDeveloperInProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.body.id;

  const queryString = `
        SELECT
            *
        FROM
            developers
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDevelopers> = await client.query(queryConfig);
  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Developer not found.",
    });
  }

  return next();
};

const verifyProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString = `
      SELECT
            *
        FROM
            projects
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDevelopers> = await client.query(queryConfig);
  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Project not found.",
    });
  }

  return next();
};

export { ensureDeveloperInProject, verifyProjectExists };
