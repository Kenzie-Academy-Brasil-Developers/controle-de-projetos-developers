import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";

const updateProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);

  const dataProject = req.body;

  const queryString: string = format(
    `
    UPDATE
        projects
    SET(%I) = ROW(%L)
    WHERE
        id = $1
    RETURNING *;
`,
    Object.keys(dataProject),
    Object.values(dataProject)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};

export { updateProject };
