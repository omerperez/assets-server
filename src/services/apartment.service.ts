import { FilterQuery, Types } from "mongoose";
import { CreateApartmentDto, EditApartmentDto } from "../data/dto/apartment.dto";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import { IUserSchema } from "../data/interfaces/user.interfaces";
import apartmentRepository from "../repositories/apartment.repo";
import userService from "./user.service";

class ApartmentService {
    async create(createApartment: CreateApartmentDto, images: string[], user: IUserSchema): Promise<IApartmentSchema> {
        try {
            const { _id: userId } = user;
            const newApartment = await apartmentRepository.create(createApartment, images, userId);
            const { _id: apartmentId } = newApartment;
            await userService.addApartment(userId, apartmentId);
            return newApartment;
        } catch (error) {
            console.error('Create apartment error:', error);
            throw error;
        }
    }

    async getAll(userId: string) {
        const user = (await userService.findById(userId)).populate('apartments');
        const apartments = (await user).apartments as IApartmentSchema[];
        return apartments.filter((apartment) => !apartment.isDelete);
    }

    async find(userId: string, findObject: FilterQuery<IApartmentSchema>, selectText?: string): Promise<(IApartmentSchema)[]> {
        try {
            const apartments = await apartmentRepository.find({
                ...findObject,
                owner: userId
            }, selectText);
            if (!apartments || apartments.length === 0) {
                throw Object.assign(new Error('Apartments not found'), { statusCode: 404 });
            }
            return apartments;
        } catch (error) {
            console.error('Error finding apartment service:', error);
            throw error;
        }
    }

    async findById(apartmentId: string, userMobile: string): Promise<IApartmentSchema> {
        try {
            const apartment = await apartmentRepository.findById(apartmentId);
            const user = await userService.findByMobile(userMobile);
            if (!apartment.owner.equals(user._id)) {
                throw Object.assign(new Error('Ownership verification failed'), { statusCode: 403 });
            }
            return apartment;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async edit(updateApartment: EditApartmentDto, images: string[], user: IUserSchema): Promise<IApartmentSchema> {
        try {
            const { _id: userId } = user;
            const currentUser = await userService.findById(userId);
            if (!currentUser.apartments.find((apartment: Types.ObjectId) => apartment.equals(updateApartment.id))) {
                throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
            }
            return await apartmentRepository.edit(updateApartment, images, currentUser._id);
        } catch (error) {
            console.error('Create apartment error:', error);
            throw error;
        }
    }

    async deleteApartment(apartmentId: string, user: IUserSchema): Promise<void> {
        try {
            const { _id: userId } = user;
            const currentUser = await userService.findById(userId);
            if (!currentUser.apartments.find((apartment: Types.ObjectId) => apartment.equals(apartmentId))) {
                throw Object.assign(new Error('Access Denied'), { statusCode: 401 });
            }
            return await apartmentRepository.deleteApartment(apartmentId);
        } catch (error) {
            console.error('Delete apartment error:', error);
            throw error;
        }
    }

    async addTenant(apartment: IApartmentSchema, tenantId: Types.ObjectId | string): Promise<IApartmentSchema> {
        try {
            if (apartment.currentTenant) {
                apartment.tenants.push(apartment.currentTenant);
            }
            apartment.tenants.push(tenantId as Types.ObjectId);
            return await this.update(apartment._id, {
                currentTenant: tenantId as Types.ObjectId,
                tenants: apartment.tenants,
            })
        } catch (error) {
            console.error('Add tenant to apartment error:', error);
            throw error;
        }
    }

    async update(apartmentId: string | Types.ObjectId, updateObject: Partial<IApartmentSchema>): Promise<IApartmentSchema> {
        return await apartmentRepository.update(apartmentId, updateObject);
    }
}

export default new ApartmentService();
