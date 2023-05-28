import { Types } from "mongoose";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import { TenantEntity as tenantSchema } from "../models/tenant.entity";

const create = async (tenant: CreateTenantDto, apartment: Types.ObjectId, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        delete tenant.apartmentId
        const newTenant = new tenantSchema({
            ...tenant,
            owner: user._id,
            isDelete: false,
            apartment: apartment
        });
        const savedTenant: ITenantSchema = await newTenant.save();
        return savedTenant;
    } catch (error) {
        console.error('Error create tenant:', error);
        throw error;
    }
}


const userRepository = {
    create,
}

export default userRepository