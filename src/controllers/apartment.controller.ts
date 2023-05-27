import { NextFunction, Request, Response } from "express";
import apartmentService from "../services/apartment.service";
import { CreateApartmentDto } from "../data/dto/apartment.dto";
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user) {
            const apartments = await apartmentService.getAll(user.id)
            return res.status(200).send({ apartments })
        }
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { apartmentDetails, fileLocations: images } = body;
        const data = (apartmentDetails as string).trim();
        const apartmentData: CreateApartmentDto = JSON.parse(data);
        const apartment = await apartmentService.create(apartmentData, images, user);
        res.status(200).send(apartment);
    } catch (error) {
        next(error);
    }
}

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, query } = req;
        const { apartmentId } = query;
        const currentApartment = await apartmentService.findById(apartmentId as string, user.id);
        res.send({ apartment: currentApartment, tenantHistory: [] })
    } catch (error) {
        next(error);
    }
}
const apartmentController = {
    getAll,
    create, getById
}

export default apartmentController;