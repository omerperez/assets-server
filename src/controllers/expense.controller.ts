import { NextFunction, Request, Response } from "express";
import { CreateExpenseDto, EditExpenseDto } from "../data/dto/expense.dto";
import { default as expenseApartmentService, default as expenseService } from "../services/expense.service";
import { IExpensesCountPerApartmentResponse } from "../data/interfaces/expense.interface";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { expenseDetails, fileLocations: files } = body;
        const data = (expenseDetails as string).trim();
        const expenseData: CreateExpenseDto = JSON.parse(data);
        const expense = await expenseService.create(expenseData, files, user);
        return res.status(200).send(expense);
    } catch (error) {
        next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { expenseDetails, fileLocations: files } = body;
        const data = (expenseDetails as string).trim();
        const expenseData: EditExpenseDto = JSON.parse(data);
        const expense = await expenseService.update(expenseData, files, user);
        return res.status(200).send(expense);
    } catch (error) {
        next(error);
    }
}

const getApartmentsWithExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, query } = req;
        const { apartmentId } = query;
        if (user) {
            const apartmentsWithExpenses = await expenseApartmentService.getApartmentsWithExpenses(user.mobile, apartmentId as string)
            return res.status(200).send(apartmentsWithExpenses)
        }
    } catch (error) {
        next(error);
    }
}

const getExpensesCountApartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user) {
            const apartmentsWithExpenses: IExpensesCountPerApartmentResponse[] = await expenseApartmentService.getExpensesCountForeachApartment(user.id)
            return res.status(200).send(apartmentsWithExpenses)
        }
    } catch (error) {
        next(error);
    }
}

const expenseController = {
    create, update, getApartmentsWithExpenses, getExpensesCountApartments
}

export default expenseController;