import { NextFunction, Request, Response } from "express";
import { RegisterUserBody } from "../data/interfaces/user.interfaces";
import userService from "../services/user.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registerUser: RegisterUserBody = req.body;
        const newUser = await userService.register(registerUser);
        return res.status(200).send(newUser)
    } catch (error) {
        res.status(error.code).send();
        next(error);
    }
}

const authController = {
    register
}

export default authController;