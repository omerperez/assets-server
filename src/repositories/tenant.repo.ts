import { FilterQuery, Types } from "mongoose";
import { CreateTenantDto } from "../data/dto/tenant.dto";
import { ITenantSchema } from "../data/interfaces/tenant.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import { TenantEntity as tenantSchema } from "../models/tenant.entity";

const find = async (filter: FilterQuery<ITenantSchema>, selectText?: string): Promise<ITenantSchema[]> => {
    try {
        let tenants = tenantSchema.find(filter);
        if (selectText) {
            tenants = tenants.select(selectText);
        }
        return tenants;
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
};

const findOne = async (filter: FilterQuery<ITenantSchema>): Promise<ITenantSchema | null> => {
    try {
        return await tenantSchema.findOne(filter);
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
};

const findById = async (id: string | Types.ObjectId): Promise<ITenantSchema | null> => {
    try {
        return await tenantSchema.findOne({ _id: id }).exec();
    } catch (error) {
        console.error('Error finding tenant by ID:', error);
        throw error;
    }
};

const createTenant = async (tenant: CreateTenantDto, apartment: Types.ObjectId, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        delete tenant.apartmentId;
        const newTenant = new tenantSchema({
            ...tenant,
            owner: user._id,
            isDelete: false,
            apartment,
        });
        const savedTenant: ITenantSchema = await newTenant.save();
        return savedTenant;
    } catch (error) {
        console.error('Error creating tenant:', error);
        throw error;
    }
};

const updateTenant = async (tenant: CreateTenantDto, user: IUserSchema): Promise<ITenantSchema> => {
    try {
        const { id: ownerId } = user;
        const existingTenant = await findOne({ id: tenant.id });
        if (!existingTenant) {
            throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
        }
        if (!existingTenant.owner.equals(ownerId)) {
            throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
        }
        return await tenantSchema.findOneAndUpdate({ _id: existingTenant._id }, tenant, { new: true });
    } catch (error) {
        console.error('Error updating tenant:', error);
        throw error;
    }
};

const deleteTenant = async (tenantId: string): Promise<void> => {
    try {
        const existingTenant = await findById(tenantId);
        if (!existingTenant) {
            throw new Error('Tenant not found');
        }
        const updateObject = {
            isDelete: true,
        };
        await tenantSchema.findOneAndUpdate({ _id: existingTenant._id }, updateObject, { new: true });
    } catch (error) {
        console.error('Error deleting tenant:', error);
        throw error;
    }
};

const tenantRepository = {
    find,
    findById,
    create: createTenant,
    update: updateTenant,
    deleteTenant,
};

export default tenantRepository;
