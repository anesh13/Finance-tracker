import mongoose from 'mongoose';

// model to track income/spending
const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    budget: { type: mongoose.Schema.Types.ObjectId, ref: 'budget' },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    description: { type: String },

  },
  {
    timestamps: true,
  },
);

const transactionModel = mongoose.model('transaction', transactionSchema);
export default transactionModel;
