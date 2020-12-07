import mongoose from 'mongoose';
import { hash } from 'bcryptjs';
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    // email: { type: String, unique: true },
    email: String, //I'm handling uniqueness in Apollo resolver
    password: String,
  },
  {
    timestamps: true, //provides for createdAt, updatedAt
  }
);

// this is mongoose middleware that intercepts just before 'save' and hashes password
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
