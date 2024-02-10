import jwt from 'jsonwebtoken';

export const generateToken = (email: string, userId: string, role: string) => {
  // Check if TOKEN_SECRET is defined
  if (!process.env.TOKEN_SECRET) {
    throw new Error('TOKEN_SECRET is not defined in environment variables');
  }

  const token = jwt.sign(
    { email, userId, role },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '9999h',
    }
  );
  return token;
};
