import mongoose from 'mongoose';

// model to track income/spending
const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    budget: { type: mongoose.Schema.Types.ObjectId, ref: 'budget' },
    goal: { type: mongoose.Schema.Types.ObjectId, ref: 'goal' },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    description: { type: String },

  },
  {
    timestamps: true,
  },
);

// create indexes for the transaction schema to improve query performance
transactionSchema.index({ type: 1, userId: 1 }); // compound index based on type and userId
transactionSchema.index({ category: 1, userId: 1 }); // compound index based on userId and category
transactionSchema.index({ userId: 1 }); // index on userId

const TransactionModel = mongoose.model('transaction', transactionSchema);
export default TransactionModel;
