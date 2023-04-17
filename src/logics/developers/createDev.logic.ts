import { Request, Response } from "express";
import format from "pg-format";
import { client } from "../../database";
import {
  IDevelopers,
  TDevelopersRequest,
} from "../../interfaces/interfaces.developers";
import { QueryResult } from "pg";

const createDev = async (req: Request, res: Response): Promise<Response> => {
  const data: TDevelopersRequest = req.body;

  const queryString: string = format(
    `
        INSERT INTO
            developers(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryResult: QueryResult<IDevelopers> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export { createDev };
