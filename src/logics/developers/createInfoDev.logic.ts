import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

const createInfoDev = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dataInfoDev: any = req.body;
  dataInfoDev.developerId = parseInt(req.params.id);

  const queryString: string = format(
    `
        INSERT INTO
            developer_infos(%I)
        VALUES
            (%L)
        RETURNING *;
    `,
    Object.keys(dataInfoDev),
    Object.values(dataInfoDev)
  );

  const queryResult: QueryResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export { createInfoDev };
