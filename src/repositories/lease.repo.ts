import { EditExpenseDto } from "../data/dto/expense.dto";
import { CreateLeaseDto } from "../data/dto/lease.dto";
import { ILeaseSchema } from "../data/interfaces/lease.interface";
import { LeaseEntity as leaseSchema } from "../models/lease.entity";

const create = async (lease: CreateLeaseDto, files: string[]): Promise<ILeaseSchema> => {
    try {
        const currentLease = new leaseSchema({
            ...lease,
            files,
            isDelete: false,
            editDate: new Date(),
            createDate: new Date(),
        });
        const savedLease: ILeaseSchema = await currentLease.save();
        return savedLease;
    } catch (error) {
        console.error('Error create tenant:', error);
        throw error;
    }
}

const findByObjectId = async (id: string): Promise<ILeaseSchema | null> => {
    try {
        return await leaseSchema.findById(id).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
}

const findById = async (id: string): Promise<ILeaseSchema | null> => {
    try {
        return await leaseSchema.findOne({ id }).exec();
    } catch (error) {
        console.error('Error finding tenant:', error);
        throw error;
    }
}

const update = async (editExpense: EditExpenseDto, files: string[]): Promise<ILeaseSchema> => {
    try {
        const existingExpense = await findById(editExpense.id);
        if (!existingExpense) {
            throw Object.assign(new Error('Expense not found'), { statusCode: 404 });
        }
        const updateExpense = {
            ...editExpense,
            files: editExpense.files.concat(files)
        }
        return await leaseSchema.findOneAndUpdate(existingExpense._id, updateExpense, { new: true });
    } catch (error) {
        console.error('Update tenant error:', error);
        throw error;
    }
}

const leaseRepository = {
    create, update
}

export default leaseRepository