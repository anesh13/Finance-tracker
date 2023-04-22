import AccountModel from '../models/AccountModel.js';

// create a checking or savings account
const createAccount = async (req, res) => {
  const {
    userId, type, name, balance,
  } = req.body;

  try {
    // create new account
    const newAccount = new AccountModel({
      userId, type, name, balance,
    });
    // store account in db
    await newAccount.save();
    console.log(newAccount);

    // return response to client
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getAllAccounts = async (req, res) => {

  // todo
};

const getAccount = async (req, res) => {

  // todo
};

const updateAccount = async (req, res) => {

  // todo
};

const removeAccount = async (req, res) => {

  // todo
};

export {
  createAccount, getAllAccounts, getAccount, updateAccount, removeAccount,
};
