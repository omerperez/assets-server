import { NextFunction, Request, Response } from "express";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import tenantService from "../services/tenant.service";

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const tenantData: CreateTenantDto = body;
        console.log("tenantData", tenantData)
        const tenant = await tenantService.create(tenantData, user);
        console.log("tenant", tenant)
        return res.status(200).send(tenant);
    } catch (error) {
        next(error);
    }
}

const tenantController = {
    create
}

export default tenantController;