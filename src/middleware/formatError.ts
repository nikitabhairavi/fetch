import {Response, Request, NextFunction} from "express";
import { ApiError } from "../Models/ApiError";

export function formatAndReturnError(error: ApiError, _req:Request, res: Response, next:NextFunction)  {
    return res.status(error.status).json(error.message);
}
export default formatAndReturnError;