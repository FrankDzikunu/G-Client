const express = require("express");
const { registerUser } = require("../controllers/registercourseController");
const router = express.Router();
const upload = require("../multerConfig");

router.post("/", upload.single("image"), registerUser);

module.exports = router;
