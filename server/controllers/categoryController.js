import CategoryModel from '../models/CategoryModel.js';

const createCategory = async (req, res) => {
  const { userId, name } = req.body;
  try {
    const newCategory = new CategoryModel({
      userId,
      name,
    });

    // check category name if it exists
    const categoryExists = CategoryModel.findOne({ name });
    // category already exists
    if (categoryExists) {
      console.log(categoryExists);
      res.status(409).json({ message: 'Category already exists' });
    } else {
      // create new category in db
      await newCategory.save();
      console.log(newCategory);

      res.status(201).json(newCategory);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {

  // todo
};

const getCategory = async (req, res) => {

  // todo
};

const removeCategory = async (req, res) => {

  // todo
};

export {
  createCategory, getAllCategories, getCategory, removeCategory,
};
