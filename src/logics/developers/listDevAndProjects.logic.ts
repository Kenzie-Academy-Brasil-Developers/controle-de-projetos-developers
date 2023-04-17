import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const listDevAndProjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
        SELECT
            d."id" AS "developerId",
            d."name" AS "developerName",
            d."email" AS "developerEmail",
            di."developerSince" AS "developerInfoDeveloperSince",
            di."preferredOS" AS "developerInfoPreferredOS"
        FROM
            developers d
        FULL OUTER JOIN
            developer_infos di
        ON
            di."developerId" = d."id"
        WHERE
            d."id" = $1
        ;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows[0]);
};

export { listDevAndProjects };
