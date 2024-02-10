import { Request, Response } from 'express';

import bcrypt from 'bcryptjs'; // For password hashing
import UserModel, { IUser } from '../model/User';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Signup controller function
export const signup = async (req: Request, res: Response) => {
  try {
    console.log('req.body : ', req.body);
    // Destructure user data from request body
    const { email, fullName, password } = req.body;

    // Check if user already exists with the provided email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser: IUser = new UserModel({
      email,
      fullName,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

