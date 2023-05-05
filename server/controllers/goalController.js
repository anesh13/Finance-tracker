import GoalModel from '../models/GoalModel.js';

const createGoal = async (req, res) => {
  const userId = req.user._id;
  try {
    // create new GoalModel
    const newGoal = new GoalModel({ user: userId, ...req.body });
    // store goal in db
    await newGoal.save();
    console.log(newGoal);

    // return response to client
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const userId = req.user._id;
    const goals = await GoalModel.find({ user: userId });
    console.log(`goals: ${goals}`);
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGoal = async (req, res) => {

  // todo
};

const updateGoal = async (req, res) => {

  // todo
};

const removeGoal = async (req, res) => {

  // todo
};

export {
  createGoal, getAllGoals, getGoal, updateGoal, removeGoal,
};
