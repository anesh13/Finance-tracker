import mongoose from 'mongoose';
import TransactionModel from '../models/TransactionModel.js';
import AccountModel from '../models/AccountModel.js';
import BudgetModel from '../models/UserModel.js';
import GoalModel from '../models/GoalModel.js';

const addTransaction = async (req, res) => {
  const {
    // required in transactions
    account, category, type, amount,
    // optional
    budget, goal, description,
  } = req.body;

  const userId = req.user._id;
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
  try {
    const userId = req.user._id;
    const transactions = await TransactionModel.find({ userId });

    // no transactions found
    if (!transactions) {
      // not found
      res.status(4004).json({ message: 'no transactions found' });
      console.log('no transactions found');
      return;
    }
    console.log(transactions);

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getTransaction = async (req, res) => {
  const transactionType = req.query.type; // expense or income
  // console.log(req.headers);

  console.log(req.user._id);
  console.log(transactionType);
  try {
    // for testing without using jwt token user id
    // const id = new mongoose.Types.ObjectId(req.query.userId);
    // console.log(id);

    const transactionsByCategory = await TransactionModel.aggregate([
      {
        // filter user transactions by type
        $match: { userId: req.user._id, type: transactionType },
        // $match: { userId: id, type: transactionType }, // for postman testing
      },
      {
        // join transaction collection with category collection
        $lookup: {
          from: 'categories',
          localField: 'category', // category id
          foreignField: '_id',
          as: 'categoryData',
        },
      },
      { // group by category name with their total amount
        $group: {
          _id: '$categoryData.name',
          totalAmount: { $sum: '$amount' },
        },
      },
      // sort by each category total amount in descending order
      { $sort: { totalAmount: -1 } },
    ]);

    console.log(transactionsByCategory);
    res.status(200).json(transactionsByCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
