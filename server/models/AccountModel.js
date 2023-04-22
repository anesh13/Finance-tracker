import mongoose from 'mongoose';

// user account type
const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    type: { type: String, enum: ['checking', 'savings'], required: true }, // to do 'creditCard', 'investment'
    name: { type: String },
    balance: { type: Number, required: true },

  },
  {
    timestamps: true,
  },
);

const AccountModel = mongoose.model('account', accountSchema);
export default AccountModel;
