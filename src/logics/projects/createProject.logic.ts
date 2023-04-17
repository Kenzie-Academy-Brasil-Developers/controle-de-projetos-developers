import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dataProject = req.body;

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

  const queryResult: QueryResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export { createProject };
