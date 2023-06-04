import { Router } from "express";
import { upload, uploadToS3 } from "../middleware/upload.middleware";
import leaseController from "../controllers/lease.controller";

const router = Router();

router.post('/create', upload.array('files'), uploadToS3, leaseController.create);

router.post('/edit', upload.array('files'), uploadToS3, leaseController.update);

export default router;