import mongoose from 'mongoose';

// budget model to track spending limits
const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  amount: { type: Number, required: true },
  period: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  // todo limit spending by category
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' }, // optional

}, {
  timestamp: true,

});

const BudgetModel = mongoose.model('budget', budgetSchema);
export default BudgetModel;
