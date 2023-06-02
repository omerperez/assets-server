import { NextFunction, Request, Response } from "express";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import tenantService from "../services/tenant.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const tenantData: CreateTenantDto = body;
        const tenant = await tenantService.create(tenantData, user);
        return res.status(200).send(tenant);
    } catch (error) {
        next(error);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const tenantData: CreateTenantDto = body;
        const tenant = await tenantService.update(tenantData, user);
        return res.status(200).send(tenant);
    } catch (error) {
        next(error);
    }
}

const deleteTenant = async (req: Request, res: Response, next: NextFunction) => {
    console.log("here");
    try {
        const { user, body } = req;
        const { tenantId } = body;
        const tenant = await tenantService.deleteTenant(tenantId, user);
        res.status(200).send(tenant);
    } catch (error) {
        const err = error;
        if (error.statusCode === 11000) {
            err.message = Object.keys(error.keyPattern).toString()
        }
        next(error);
    }
}

const tenantController = {
    create, update, deleteTenant
}

export default tenantController;