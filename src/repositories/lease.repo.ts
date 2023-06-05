import { EditExpenseDto } from "../data/dto/expense.dto";
import { CreateLeaseDto } from "../data/dto/lease.dto";
import { ILeaseSchema } from "../data/interfaces/lease.interface";
import { LeaseEntity as leaseSchema } from "../models/lease.entity";

const createLease = async (lease: CreateLeaseDto, files: string[]): Promise<ILeaseSchema> => {
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
        console.error('Error creating lease:', error);
        throw error;
    }
};

const findById = async (id: string): Promise<ILeaseSchema | null> => {
    try {
        return await leaseSchema.findById(id).exec();
    } catch (error) {
        console.error('Error finding lease by ID:', error);
        throw error;
    }
};

const updateLease = async (editExpense: EditExpenseDto, files: string[]): Promise<ILeaseSchema> => {
    try {
        const existingLease = await findById(editExpense.id);
        if (!existingLease) {
            throw Object.assign(new Error('Lease not found'), { statusCode: 404 });
        }
        const updateExpense = {
            ...editExpense,
            files: editExpense.files.concat(files),
        };
        return await leaseSchema.findByIdAndUpdate(existingLease._id, updateExpense, { new: true });
    } catch (error) {
        console.error('Error updating lease:', error);
        throw error;
    }
};

const leaseRepository = {
    create: createLease,
    update: updateLease,
};

export default leaseRepository;
