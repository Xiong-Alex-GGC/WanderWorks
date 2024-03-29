import express from 'express';
import * as expenseController from '../controllers/expenseController.js';

const router = express.Router();

router.get('/expenses', expenseController.getAllExpenses);
router.get('/expenses/:id', expenseController.getItineraryExpenses);
router.post('/create-expense', expenseController.createExpense);
//router.post('/update-expense', expenseController.updateExpense);
router.get('/expense/:id', expenseController.getExpenseById);
router.delete('/delete-expense', expenseController.deleteExpense);

export default router;