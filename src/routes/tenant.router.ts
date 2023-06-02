import { Router } from "express";
import tenantController from "../controllers/tenant.controller";


const router = Router();

router.post('/create', tenantController.create);

router.post('/edit', tenantController.update);

router.post('/delete', tenantController.deleteTenant);

export default router;