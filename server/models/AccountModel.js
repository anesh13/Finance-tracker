import mongoose from 'mongoose';

// user account type
const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    type: { type: String, enum: ['Checking', 'Savings', 'Credit Card', 'Loan'], required: true }, // to do 'creditCard', 'investment'
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    creditLimit: { type: Number },

  },
  {
    timestamps: true,
  },
);

const AccountModel = mongoose.model('account', accountSchema);
export default AccountModel;
