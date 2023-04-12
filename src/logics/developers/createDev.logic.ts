import { Request, Response } from "express";
import format from "pg-format";
import { client } from "../../database";

const createDev = async (req: Request, res: Response): Promise<Response> => {
  const data = req.body;

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

  const queryResult: any = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

export { createDev };
