import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { RegisterUserDto } from "../data/dto/user.dto";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registerUser: RegisterUserDto = req.body;
        const newUser = await userService.register(registerUser);
        return res.status(200).send(newUser)
    } catch (error) {
        next(error);
    }
}

const getDocuments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user) {
            const documents = await userService.getDocuments(user)
            return res.status(200).send(documents)
        }
    } catch (error) {
        next(error);
    }

}
const userController = {
    register, getDocuments
}

export default userController;