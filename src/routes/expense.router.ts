import { Router } from "express";
import expenseController from "../controllers/expense.controller";
import { upload, uploadToS3 } from "../middleware/upload.middleware";
import userController from "../controllers/user.controller";

const router = Router();

router.post('/create', upload.array('files'), uploadToS3, expenseController.create);

router.post('/edit', upload.array('files'), uploadToS3, expenseController.update);

router.get('/apartments-expenses', expenseController.getApartmentsWithExpenses);

router.get('/expenses', expenseController.getExpensesCountApartments);

router.get("/test", userController.getDocuments)

export default router;