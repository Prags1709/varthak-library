import mongoose, { Document, Schema, model } from 'mongoose';

enum UserRole {
  Creator = 'CREATOR',
  Viewer = 'VIEWER',
  ViewAll = 'VIEW_ALL',
}

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole[];
}

const userSchema: Schema<User> = new Schema<User>({
  name: String,
  email: String,
  password: String,
  role: {
    type: [String],
    enum: [UserRole.Creator, UserRole.Viewer, UserRole.ViewAll],
    default: [UserRole.Viewer],
  },
});

const UserModel = model<User>('user', userSchema);

export { UserModel };
