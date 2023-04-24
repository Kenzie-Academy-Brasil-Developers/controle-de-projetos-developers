import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const listProjectById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
        p."id" AS "projectId",
        p."name" AS "projectName",
        p."description" AS "projectDescription",
        p."estimatedTime" AS "projectEstimatedTime",
        p."repository" AS "projectRepository",
        p."startDate" AS"projectStartDate",
        p."endDate" AS "projectEndDate",
        p."developerId" AS "projectDeveloperId",
        t."id" AS "technologyId",
        t."name" AS "technologyName"
    FROM
        projects p
    FULL JOIN 
        projects_technologies pt ON pt."projectId" = p."id"
    FULL JOIN 
        technologies t ON t."id" = pt."technologyId"
    WHERE
        p."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};

export { listProjectById };
