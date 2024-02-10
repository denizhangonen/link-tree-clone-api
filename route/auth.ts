import express, { Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';
const AuthController = require('../controller/AuthController');

const router = express.Router();

// Validation middleware
const loginValidation: ValidationChain[] = [
  body('email').trim().isLength({ min: 1 }),
  body('password').trim().isLength({ min: 1 }),
];

// Login route
router.post('/login', loginValidation, async (req: Request, res: Response) => {
  AuthController.login(req, res);
});

// Validation middleware for signup
const signupValidation = [
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Full name is required'),
];

// Signup route
router.post(
  '/signup',
  signupValidation,
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call signup controller function
    AuthController.signup(req, res);
  }
);

export default router;

