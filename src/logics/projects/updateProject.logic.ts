import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import { IProject } from "../../interfaces/interfaces.projects";

const updateProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const dataProject: Partial<IProject> = req.body;

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

  const queryResult: QueryResult<IProject> = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};

export { updateProject };
