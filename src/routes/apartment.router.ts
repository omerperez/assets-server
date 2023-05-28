import { Router } from "express";
import apartmentController from "../controllers/apartment.controller";
import { upload, uploadToS3 } from "../middleware/upload.middleware";


const router = Router();

router.get("/my-apartments", apartmentController.getAll)

router.get("/find", apartmentController.getById);

router.post('/create', upload.array('files'), uploadToS3, apartmentController.create);

router.post('/edit', upload.array('files'), uploadToS3, apartmentController.edit);

router.post('/delete', apartmentController.deleteApartment);

export default router;