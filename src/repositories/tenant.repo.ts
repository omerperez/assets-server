import { Types } from "mongoose";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import { TenantEntity as tenantSchema } from "../models/tenant.entity";

const getTenantById = async (id: string | Types.ObjectId): Promise<ITenantSchema | null> => {
    try {
        return await tenantSchema.findById(id);
    } catch (error) {
        console.log("Error find tenant:", error)
        throw error;
    }
}

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
const findByObjectId = async (id: string): Promise<ITenantSchema | null> => {
    try {
        return await tenantSchema.findById(id).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
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
            throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
        }
        if (!existingTenant.owner.equals(ownerId)) {
            throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
        }
        return await tenantSchema.findOneAndUpdate(existingTenant._id, tenant, { new: true });
    } catch (error) {
        console.error('Update tenant error:', error);
        throw error;
    }
}

const deleteTenant = async (tenantId: string): Promise<void> => {
    try {
        const existingTenant = await findByObjectId(tenantId);
        if (!existingTenant) {
            throw new Error('Tenant not found');
        }
        const updateObject = {
            isDelete: true
        }
        return await tenantSchema.findOneAndUpdate(existingTenant._id, updateObject, { new: true });
    } catch (error) {
        console.error('Error delete tenant:', error);
        throw error;
    }
}
const tenantRepository = {
    getTenantById,
    create, update, deleteTenant
}

export default tenantRepository