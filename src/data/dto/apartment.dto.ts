interface CreateApartmentDto {
    name: string;
    city: string;
    neighborhood?: string;
    street: string;
    number: number;
    floor?: number;
    apartmentNumber?: number;
    postCode?: string;
    price: number;
    area: number;
    rooms: number;
    toiletCount: number;
    isAnimalsConfirm: number;
    includedPayments: string[];
    mainImageIndex: number;
    comment?: string;
}

interface UploadedFile {
    buffer: Buffer;
    originalname: string;
}

export { CreateApartmentDto, UploadedFile }