import mongoose from 'mongoose';

// category model for transaction types
const categorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },

    // todo create transaction type here also for less db query?
    // type: { type: String, enum: ['income', 'expense'] },

  },
  {
    timestamps: true,
  },
);

const categoryModel = mongoose.model('transaction', categorySchema);

export default categoryModel;
