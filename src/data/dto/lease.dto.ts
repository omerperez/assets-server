interface CreateLeaseDto {
    startDate: string;
    endDate: string;
    price: number;
    tenantId: string;
    apartmentId: string;
}

interface EditLeaseDto extends CreateLeaseDto {
    id: string;
    files: string[];
}

export { CreateLeaseDto, EditLeaseDto }