import TransactionModel from '../models/TransactionModel.js';
import AccountModel from '../models/AccountModel.js';
import BudgetModel from '../models/UserModel.js';
import GoalModel from '../models/GoalModel.js';

const addTransaction = async (req, res) => {
  const {
    // required in transactions
    userId, account, category, type, amount,
    // optional
    budget, goal, description,
  } = req.body;

  try {
    const newTransaction = new TransactionModel({
      userId, account, category, type, amount, budget, goal, description,
    });
    // const newTransaction = new TransactionModel(req.body);

    // create new Transaction
    await newTransaction.save();
    // console.log(saveTransaction);
    console.log(newTransaction);

    // todo: use RabbitMQ or Kafka to handle updates for account, budget, and goal?

    // Adjust account balance
    // increment balance if transaction type is income else decrement
    const accountUpdate = { $inc: { balance: type === 'income' ? amount : -amount } };
    await AccountModel.findByIdAndUpdate(account, accountUpdate);

    // Adjust user budget if it exists
    if (budget) {
      // increment budget amount if transaction type is income else decrement
      const budgetUpdate = { $inc: { amount: type === 'income' ? amount : -amount } };
      await BudgetModel.findByIdAndUpdate(budget, budgetUpdate);
      console.log('budget updated');
    }

    // Adjust user goal if it exists
    if (goal) {
      // increment goal currentAmount if transaction type is income else decrement
      const goalUpdate = { $inc: { currentAmount: type === 'income' ? amount : -amount } };
      await GoalModel.findByIdAndUpdate(goal, goalUpdate);
      console.log('goal updated');
    }

    // Return the new transaction as response to the client
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTransactions = async (req, res) => {

  // todo
};

const getTransaction = async (req, res) => {

  // todo
};

// const updateTransaction = async (req, res) => {
//
//     // todo
// };
//
// const removeTransaction = async (req, res) => {
//
//     // todo
// };

export {
  addTransaction, getAllTransactions, getTransaction,
};
