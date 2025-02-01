const Learner = require("../models/Learner");

// @desc    Get all learners
// @route   GET /api/learners
// @access  Private (Admin)
const getLearners = async (req, res) => {
  try {
    const learners = await Learner.find().populate("courses");
    res.json(learners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new learner
// @route   POST /api/learners
// @access  Private (Admin)
const createLearner = async (req, res) => {
  const { name, email, gender, contact, bio, courses } = req.body;

  try {
    const learner = new Learner({ name, email, gender, contact, bio, courses });
    await learner.save();
    res.status(201).json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single learner
// @route   GET /api/learners/:id
// @access  Private (Admin)
const getLearner = async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id).populate("courses");
    if (!learner) return res.status(404).json({ message: "Learner not found" });

    res.json(learner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update learner details
// @route   PUT /api/learners/:id
// @access  Private (Admin)
const updateLearner = async (req, res) => {
  const learner = await Learner.findById(req.params.id);

  if (learner) {
    learner.name = req.body.name || learner.name;
    learner.email = req.body.email || learner.email;
    learner.gender = req.body.gender || learner.gender;
    learner.contact = req.body.contact || learner.contact;
    learner.program = req.body.program || learner.program;
    learner.amountPaid = req.body.amountPaid || learner.amountPaid;
    learner.paymentStatus = req.body.paymentStatus || learner.paymentStatus;
    learner.bio = req.body.bio || learner.bio;

    const updatedLearner = await learner.save();
    res.json(updatedLearner);
  } else {
    res.status(404).json({ message: "Learner not found" });
  }
};

// @desc    Delete learner
// @route   DELETE /api/learners/:id
// @access  Private (Admin)
const deleteLearner = async (req, res) => {
  try {
    await Learner.findByIdAndDelete(req.params.id);
    res.json({ message: "Learner deleted" });
  } catch (error) {
    res.status(404).json({ message: "Learner not found" });
  }
};

module.exports = {
  getLearners,
  createLearner,
  getLearner,
  updateLearner,
  deleteLearner,
};
