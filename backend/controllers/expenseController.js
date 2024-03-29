import * as expenseModel from '../models/expenseModel.js';

//Retriseves all expenses from the db and returns it
export const getAllExpenses = async (req, res) => {
  try {
    const list = await expenseModel.getAllExpenses();
    res.send(list); //res is essentially a return statement
  } catch (error) {
    console.error('Error fetching Expense data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getItineraryExpenses = async (req, res) => {
  try {

    const list = await expenseModel.getAllItineraryExpenses(req.params.id);
    res.send(list);
  } catch (error) {
    console.error('Error fetching Itinerary data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//creates a new expense
export const createExpense = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data of Expense ", data);

    await expenseModel.createExpense(data);
    res.send({ msg: "Expense Added" });
  } catch (error) {
    console.error('Error creating Expense data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//updates an expense
export const updateExpense = async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;

    await expenseModel.updateExpense(id, data);
    res.send({ msg: "Expense Updated" });
  } catch (error) {
    console.error('Error updating Expense data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//retrieves an expense by its Id
export const getExpenseById = async (req, res) => {
  const id = req.params.id;

  try {
    const expenseData = await expenseModel.getExpenseById(id);

    if (expenseData) {
      res.json(expenseData);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error('Error fetching specific Expense data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//deleteExpense
export const deleteExpense = async (req, res) => {
  //const userID = req.body.userID; 
  const expenseID = req.body.expenseID;

  try {
    const deletionResult = await expenseModel.deleteExpense(expenseID);

    if (deletionResult) {
      res.send({ msg: "Expense Deleted" });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error('Error deleting Expense data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};