interface CreateTenantDto {
    id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    anotherMobile: string;
    email: string;
    gender: number;
    birthday: Date,
    enteryDate: Date,
    endDate: Date,
    apartmentId: string;
}

export { CreateTenantDto }