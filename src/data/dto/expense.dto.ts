interface CreateExpenseDto {
    name: string;
    price?: number;
    description?: string;
    isExpense?: boolean;
    apartmentId: string;
}

interface EditExpenseDto extends CreateExpenseDto {
    id: string;
    files: string[];
}

export { CreateExpenseDto, EditExpenseDto }