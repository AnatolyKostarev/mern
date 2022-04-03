const { Router } = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля - 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже зарегистрирован" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });
      await user.save();

      res.status(201).json({ message: "Вы успешно зарегистрированы" });
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйтке снова" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйтке снова" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе",
        });
      }
      const { email, password } = res.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь не зарегистрирован" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйтке снова" });
    }
  }
);

module.exports = router;
