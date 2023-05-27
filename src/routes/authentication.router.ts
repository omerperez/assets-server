import { Router } from "express";
import authController from "../controllers/authentication.controller";

const router = Router();

router.post('/login', authController.login);

router.post('/verify', authController.verify);

export default router;