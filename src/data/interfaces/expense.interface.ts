import { Document, } from 'mongoose';

interface IExpenseSchema extends Document {
    name: string;
    price: number;
    description?: string;
    files?: string[]
    createDate: Date;
    editDate: Date;
    isDeleted: boolean;
    isExpense: boolean;
}

interface IExpensesCountPerApartmentResponse {
    apartmentId: string;
    apartmentName?: string;
    expenseCount: number;
    currentTenantId: string;
    currentTenantName: string;
}

export { IExpenseSchema, IExpensesCountPerApartmentResponse };
