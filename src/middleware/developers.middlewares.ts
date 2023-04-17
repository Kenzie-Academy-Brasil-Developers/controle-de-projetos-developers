import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import {
  IDevelopers,
  IDevelopersInfo,
  TDevelopersInfoRequest,
} from "../interfaces/interfaces.developers";

const ensureEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const data: TDevelopersInfoRequest = req.body.email;

  const queryString: string = `
        SELECT
            *
        FROM
            developers
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [data],
  };

  const queryResult: QueryResult<IDevelopers> = await client.query(queryConfig);

  if (queryResult.rowCount !== 0) {
    res.status(409).json({
      message: "Email already exists.",
    });
  }

  next();
};

const ensureIdDevExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let id: number = parseInt(req.params.id);

  if (req.route.path === "/projects") {
    id = req.body.developerId;
  } else if (req.route.path === "/projects/:id" && req.method === "PATCH") {
    id = req.body.developerId;
  }

  const queryString: string = `
    SELECT * FROM
        developers
    WHERE
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDevelopers> = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      message: "Developer not found.",
    });
  }

  return next();
};

const verifyOS = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const preferredOSRequest: string = req.body.preferredOS;

  const preferredOS: Array<string> = ["Windows", "Linux", "MacOS"];

  if (!preferredOS.includes(preferredOSRequest)) {
    return res.status(400).json({
      message: "Invalid OS option.",
      options: ["Windows", "Linux", "MacOS"],
    });
  }

  return next();
};

const verifyInfoDevExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT * FROM
        developer_infos
    WHERE
        "developerId" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IDevelopersInfo> = await client.query(
    queryConfig
  );

  if (queryResult.rowCount === 1) {
    return res.status(409).json({
      message: "Developer infos already exists.",
    });
  }

  return next();
};

export { ensureEmailExists, ensureIdDevExists, verifyOS, verifyInfoDevExists };
