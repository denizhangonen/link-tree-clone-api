import mongoose, { Schema, Document } from 'mongoose';

// Define interface for user document
export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  isEmailVerified: boolean;
  confirmationToken?: string;
  emailVerificationExpires?: Date;
}

// Define user schema
const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  confirmationToken: String,
  emailVerificationExpires: Date,
});

// Create and export User model
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
