import {Document, Model, model, Schema} from 'mongoose';

export const UserSchema: Schema = new Schema<any>({// TODO interface
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const User: Model<any> = model('users', UserSchema);
