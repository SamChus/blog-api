const express = require('express');

const Joi = require('joi');
const { createUser, loginUser } = require('../controllers/userControllers');

const router = express.Router();

router.get('/users', (req, res) => {
  res.send('Hello Users');
});

router.get('/register',createUser)
router.get("/login", (req, res) => {
    res.send('Hello Login new User into the database');
})


module.exports = router;

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
}