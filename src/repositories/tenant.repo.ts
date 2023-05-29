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
            apartment
        });
        const savedTenant: ITenantSchema = await newTenant.save();
        return savedTenant;
    } catch (error) {
        console.error('Error create tenant:', error);
        throw error;
    }
}
const findById = async (id: string): Promise<ITenantSchema | null> => {
    try {
        return await tenantSchema.findOne({ id }).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
}

const update = async (tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        const { id: ownerId } = user;
        const existingTenant = await findById(tenant.id);
        if (!existingTenant) {
            throw new Error('Tenant not found');
        }
        if (!existingTenant.owner.equals(ownerId)) {
            throw new Error('Access Denied');
        }
        return await tenantSchema.findOneAndUpdate(existingTenant._id, tenant, { new: true });
    } catch (error) {
        console.error('Update tenant error:', error);
        throw error;
    }
}

const userRepository = {
    create, update
}

export default userRepository