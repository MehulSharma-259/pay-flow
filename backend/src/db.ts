/** @format */

import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "";

if(!mongoUrl) {
  throw new Error("mongoUrl not defined");
}

const connectToDB = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('Database connected')
  } catch (err) {
    console.error("DB connection failed")
    return;
  }
};

connectToDB(mongoUrl);

const {Schema} = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true  },
  email: { type: String, unique: true, required: true, trim: true  },
  password: { type: String, required: true },
});

const accountSchema = new Schema({
  balance: {type: Number, default: 0},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
})

export const User = mongoose.model("User", userSchema);
export const Account = mongoose.model('Account', accountSchema);

