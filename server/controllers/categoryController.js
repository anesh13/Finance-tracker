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
  try {
    const userId = req.user._id;
    console.log(userId);

    const categories = await CategoryModel.find({ userId });

    // no categories
    if (!categories) {
      // not found
      res.status(4004).json({ message: 'no categories' });
      console.log('no categories');
      return;
    }
    console.log(categories);
    // return categories
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
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
