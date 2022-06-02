const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router();

router.post(
  '/registration',
  [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password should be min length 6').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data on registration'
        })
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User with this email was registrated" })
      }

      const hashedPass = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPass });

      await user.save();

      return res.status(201).json({ message: 'user created' });

    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong with registration' })
    }
  });

router.post(
  '/login',
  [
    check('email', 'incorrect email').normalizeEmail().isEmail(),
    check('password', 'Input your password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data on login'
        })
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isMatchPasswords = bcrypt.compare(password, user.password);

      if (!isMatchPasswords) {
        return res.status(400).json({ message: 'Wrong password.Try again' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong with login' })
    }
  })

module.exports = router;