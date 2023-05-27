import { Router } from "express";
import apartmentController from "../controllers/apartment.controller";
import { uploadToS3, upload } from "../middleware/upload.middleware";


const router = Router();

router.get("/my-apartments", apartmentController.getAll)

router.get("/find", apartmentController.getById);

router.post('/create', upload.array('files'), uploadToS3, apartmentController.create);

router.post('/edit');

router.post('/delete');

export default router;