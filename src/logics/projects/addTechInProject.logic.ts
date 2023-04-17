import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import format from "pg-format";

const addTechInProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const projectId = parseInt(req.params.id);
  const addedIn = new Date();
  const technologyName = req.body.name;

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

  const technology = queryResult.rows[0];

  const technologyId = technology.id;

  const dataProjectAndTech = {
    addedIn: addedIn,
    projectId: projectId,
    technologyId: technologyId,
  };

  queryString = format(
    `
    INSERT INTO
        projects_technologies(%I)
    VALUES
        (%L);
  `,
    Object.keys(dataProjectAndTech),
    Object.values(dataProjectAndTech)
  );

  queryResult = await client.query(queryString);

  queryString = `
  SELECT
	t."id" AS "technologyId",
    t."name" AS "technologyName",
    p."id" AS "projectId",
    p."name" AS "projectName",
    p."description" AS "projectDescription",
    p."estimatedTime" AS "projectEstimatedTime",
    p."repository" AS "projectRepository",
    p."startDate" AS"projectStartDate",
    p."endDate" AS "projectEndDate"
FROM
    projects p
FULL JOIN 
    projects_technologies pt ON pt."projectId" = p."id"
FULL JOIN 
    technologies t ON t."id" = pt."technologyId"
WHERE
    p."id" = $1;
  `;

  queryConfig = {
    text: queryString,
    values: [projectId],
  };

  queryResult = await client.query(queryConfig);

  return res.status(201).json(queryResult.rows[0]);
};

export { addTechInProject };
