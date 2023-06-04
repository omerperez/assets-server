import { NextFunction, Request, Response } from "express";
import { EditExpenseDto } from "../data/dto/expense.dto";
import { CreateLeaseDto } from "../data/dto/lease.dto";
import leaseService from "../services/lease.service";


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { leaseDetails, fileLocations: files } = body;
        const data = (leaseDetails as string).trim();
        const leaseData: CreateLeaseDto = JSON.parse(data);
        const lease = await leaseService.create(leaseData, files, user);
        return res.status(200).send(lease);
    } catch (error) {
        next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { leaseDetails, fileLocations: files } = body;
        const data = (leaseDetails as string).trim();
        const leaseData: EditExpenseDto = JSON.parse(data);
        const lease = await leaseService.update(leaseData, files, user);
        return res.status(200).send(lease);
    } catch (error) {
        next(error);
    }
}


const leaseController = {
    create, update,
}

export default leaseController;