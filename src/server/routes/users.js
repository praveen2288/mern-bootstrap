const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", function(req, res) {
  res.json({ message: "Response from get users api" });
});

router.get("/:userid", function(req, res) {
  res.json({ message: "Response from get user api" });
});

router.post("/", function(req, res) {
  // Signup
  const { body } = req;

  let { email, password } = body;

  if (!email) {
    res.status(400).send({ message: "Error: Email cannot be blank." });
  }

  if (!password) {
    res.status(400).send({ message: "Error: Password cannot be blank." });
  }

  email = email.toLowerCase();
  email = email.trim();

  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        res.status(500).send({ message: "Error: Server Error." });
      } else if (previousUsers.length > 0) {
        res.status(400).send({ message: "Error: Account already exists." });
      } else {
        const newUser = new User();
        newUser.first_name = req.body.first_name || "";
        newUser.last_name = req.body.last_name || "";
        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
          if (err) {
            res.status(500).send({ message: "Error: Server Error." });
          }
          res.status(200).send({ message: "User successfully signed up." });
        });
      }
    }
  );
});

router.put("/:userid", function(req, res) {
  res.json({ message: "Response from update user api" });
});

router.delete("/:userid", function(req, res) {
  res.json({ message: "Response from delete user api" });
});

module.exports = router;
