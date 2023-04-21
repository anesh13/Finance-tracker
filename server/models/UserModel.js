import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

});

const BudgetModel = mongoose.model('user', userSchema);
export default BudgetModel;
