import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const deleteTechinProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId: number = parseInt(req.params.id);
  const technologyName: string = req.params.name;
  let queryString: string = `
    SELECT 
            *
    FROM
        technologies
    WHERE
        "name" = $1;
    `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [technologyName],
  };

  let queryResult: QueryResult = await client.query(queryConfig);

  const technology: any = queryResult.rows[0];

  const technologyId: number = technology.id;

  queryString = `
    DELETE FROM
        projects_technologies
    WHERE
        "projectId" = $1 AND "technologyId" = $2;
  `;

  queryConfig = {
    text: queryString,
    values: [projectId, technologyId],
  };

  await client.query(queryConfig);

  return res.status(204).send();
};

export { deleteTechinProject };
