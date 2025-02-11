const Learner = require("../models/Learner");
const Course = require("../models/Course"); // Import the Course model

// @desc    Get all learners
// @route   GET /api/learners
// @access  Private (Admin)
const getLearners = async (req, res) => {
  try {
    const learners = await Learner.find().populate("course").exec();
    res.json(learners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new learner
// @route   POST /api/learners
// @access  Private (Admin)
const createLearner = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    location,
    gender,
    disabled,
    contact,
    course,       // This is the course _id from the frontend
    amount,       // This should be a number as a string (we convert it)
    description,  // This maps directly to 'description'
  } = req.body;
  
  // If a file is uploaded, use its path; otherwise, avatar is null.
  const avatar = req.file ? req.file.path : null;

  try {
    const learner = new Learner({
      firstName,
      lastName,
      email,
      location,
      gender,
      disabled,
      contact,
      course: course,            // Use "course" field as defined in the schema
      amount: Number(amount),      // Use "amount" field as defined in the schema
      description: description,    // Use "description" field as defined in the schema
      avatar,
    });

    await learner.save();
    // update the corresponding Course document to add learner's id
    await Course.findByIdAndUpdate(course, { $push: { learners: learner._id } });
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
    const learner = await Learner.findById(req.params.id).populate("course");
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
    // Note: Adjust field updates as necessary.
    learner.firstName = req.body.firstName || learner.firstName;
    learner.lastName = req.body.lastName || learner.lastName;
    learner.email = req.body.email || learner.email;
    learner.gender = req.body.gender || learner.gender;
    learner.contact = req.body.contact || learner.contact;
    learner.course = req.body.course || learner.course;
    learner.amount = req.body.amount || learner.amount;
    learner.description = req.body.description || learner.description;

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
