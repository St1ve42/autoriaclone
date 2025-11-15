import type {Request, Response, NextFunction} from "express";
import {stub} from "../const/stub.ts";

class UserController{
    public async getUsers(req: Request, res: Response, next: NextFunction){
        res.status(200).json(stub("GET", "users"))
    }
}

export const userController = new UserController()