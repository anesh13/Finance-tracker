import CategoryModel from '../models/CategoryModel.js';

const defaultCategories = [

  // expense categories
  { name: 'Rent' },
  { name: 'Utilities (Electricity, Water, Gas, Internet)' },
  { name: 'Groceries' },
  { name: 'Food & drinks' },
  { name: 'Shopping' },
  { name: 'Entertainment' },
  { name: 'Health/Medical' },
  { name: 'Travel' },
  { name: 'Gas' },
  { name: 'Miscellaneous' },

  // income categories
  { name: 'Salary' },
  { name: 'Bonus' },
  { name: 'Gift' },
  { name: 'Investment' },

];

// add default categories when a user registers
const createDefaultCategories = async (user) => {
  console.log(user._id);
  const categoryPromises = defaultCategories.map((category) => {
    const newCategory = new CategoryModel({
      ...category,
      userId: user._id,
    });
    return newCategory.save();
  });

  // waiting for all the categories to be saved to the database before continuing
  await Promise.all(categoryPromises);
};

export default createDefaultCategories;
