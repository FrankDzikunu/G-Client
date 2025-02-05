const multer = require("multer");
const path = require("path");
const UserRegistration = require("../models/registercourseModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("avatar");

const registerUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "File upload error" });

    try {
      const { firstName, lastName, email, location, course, gender, disabled, phone, amount, description } = req.body;
      const avatar = req.file ? req.file.filename : "";

      const newUser = new UserRegistration({
        firstName, lastName, email, location, course, gender, disabled, phone, amount, description, avatar,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error registering user" });
    }
  });
};

module.exports = { registerUser };
