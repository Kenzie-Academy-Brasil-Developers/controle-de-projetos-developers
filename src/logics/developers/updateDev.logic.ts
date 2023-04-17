import { Request, Response, query } from "express";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const updateDev = async (req: Request, res: Response): Promise<Response> => {
  const dataDev = req.body;

  const id = parseInt(req.params.id);

  const queryString: string = format(
    `
        UPDATE
            developers
        SET(%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING *;
    `,
    Object.keys(dataDev),
    Object.values(dataDev)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<any> = await client.query(queryConfig);
  return res.status(200).json(queryResult.rows[0]);
};

export { updateDev };
