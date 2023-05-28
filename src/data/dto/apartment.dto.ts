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

interface EditApartmentDto extends CreateApartmentDto {
    id: string;
    images: string[];
}

interface UploadedFile {
    buffer: Buffer;
    originalname: string;
}

export { CreateApartmentDto, EditApartmentDto, UploadedFile }