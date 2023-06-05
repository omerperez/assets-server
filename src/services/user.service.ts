import { IUserSchema } from "../data/interfaces/user.interfaces";
import { Types } from 'mongoose';
import userRepository from "../repositories/user.repo";
import { RegisterUserDto } from "../data/dto/user.dto";
import authService from "./authentication.service";
import { IApartmentSchema } from "../data/interfaces/apartment.interface";
import expenseService from "./expense.service";
import leaseService from "./lease.service";
import { IExpenseSchema } from "../data/interfaces/expense.interface";

class UserService {
    async findById(userId: string): Promise<IUserSchema> {
        try {
            const user = await userRepository.findById(userId);
            if (!user) {
                throw Object.assign(new Error('User not found'), { statusCode: 404 });
            }
            return user;
        } catch (error) {
            console.error('Find user error:', error);
            throw error;
        }
    }

    async findByMobile(userMobile: string): Promise<IUserSchema> {
        try {
            const user = await userRepository.findByMobile(userMobile);
            if (!user) {
                throw Object.assign(new Error('User not found'), { statusCode: 404 });
            }
            return user;
        } catch (error) {
            console.error('Find user error:', error);
            throw error;
        }
    }

    async register(user: RegisterUserDto) {
        try {
            const isExistingUser = await userRepository.isExistingUser(user.mobile, user.email);
            if (isExistingUser) {
                throw Object.assign(new Error('Mobile or email already exists'), { statusCode: 409 });
            }
            const hashPassword = await authService.hashPassword(user.password);
            user.password = hashPassword;
            return await userRepository.createUser(user);
        } catch (error) {
            console.error('Verify error:', error);
            throw error;
        }
    }


    async addApartment(user: IUserSchema, apartmentId: string): Promise<void> {
        try {
            const apartmentObjectId = new Types.ObjectId(apartmentId);
            user.apartments.push(apartmentObjectId);
            await user.save();
        } catch (error) {
            console.error('Add apartment to user error:', error);
            throw error;
        }
    }

    async addTenant(user: IUserSchema, tenantId: Types.ObjectId) {
        if (!Array.isArray(user.tenants)) {
            user.tenants = [];
        }
        user.tenants.push(tenantId);
        return await userRepository.update(user);
    }

    async getDocuments(user: IUserSchema) {
        try {
            const populatedUser = await user.populate({
                path: 'apartments',
                options: { omitUndefined: true },
            });
            const apartments = populatedUser.apartments as IApartmentSchema[];
            const apartmentIds = apartments.map((apartment) => apartment._id);
            const expenses = await expenseService.findPopulatedExpensesApartment({
                apartment: { $in: apartmentIds },
            });
            const leases = await leaseService.findPopulatedLeaseApartments({
                apartment: { $in: apartmentIds },
            });
            const result = await Promise.all(
                apartmentIds.map(async (apartmentId) => {
                    const apartmentExpenses = expenses.filter(
                        (currentExpense) =>
                            currentExpense.apartment._id.toString() === apartmentId.toString()
                    );
                    const apartmentLeases = leases.filter(
                        (currentLease) =>
                            currentLease.apartment._id.toString() === apartmentId.toString()
                    );
                    const currentApartment = apartments.find(
                        (apartment) => apartment._id.toString() === apartmentId.toString()
                    );
                    const documentsCount = apartmentExpenses.length;
                    const expenseCount = apartmentExpenses.filter(
                        (obj) => obj.expense && !(obj.expense as IExpenseSchema).isDeleted
                    ).length;
                    const obj = {
                        apartmentId: apartmentId.toString(),
                        apartmentName: currentApartment?.name,
                        expenseCount: expenseCount,
                        documentsCount: documentsCount - expenseCount,
                        leasesCount: apartmentLeases.length,
                    };
                    return obj;
                })
            );
            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
}

export default new UserService();