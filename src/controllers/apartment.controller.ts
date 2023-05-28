import { NextFunction, Request, Response } from "express";
import { CreateApartmentDto, EditApartmentDto } from "../data/dto/apartment.dto";
import apartmentService from "../services/apartment.service";

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
        const currentApartment = await apartmentService.findById(apartmentId as string, user.mobile);
        res.send(currentApartment)
    } catch (error) {
        next(error);
    }
}

const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { apartmentDetails, fileLocations: images } = body;
        const data = (apartmentDetails as string).trim();
        const apartmentData: EditApartmentDto = JSON.parse(data);
        const apartment = await apartmentService.edit(apartmentData, images, user);
        res.status(200).send(apartment);
    } catch (error) {
        next(error);
    }
}

const deleteApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, body } = req;
        const { apartmentId } = body;
        const apartment = await apartmentService.deleteApartment(apartmentId, user);
        res.status(200).send(apartment);
    } catch (error) {
        next(error);
    }
}

const apartmentController = {
    getAll,
    create,
    getById,
    edit,
    deleteApartment
}

export default apartmentController;