/** @format */

import express from "express";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {z} from "zod";
import {Account, User} from "../db";
import {signUser} from "../utils";
import {isLoggedIn} from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const signupSchema = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: result.error
      });
    }

    const {firstName, lastName, email, password} = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const userAccount = await Account.create({
      userId: newUser._id,
      balance: 1 + Math.random() * 10000,
    });

    const token = signUser({id: newUser.id});

    return res.status(201).json({
      message: "user created successfully",
      token,
      user: {
        firstName,
        lastName,
      },
    });
  } catch (err: any) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    return res.status(500).json({
      message: "internal server error",
    });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: result.error,
      });
    }

    const user = await User.findOne({
      email: result.data.email,
    });

    if (!user) {
      return res.status(401).json({
        message: "user not exists",
      });
    }

    const isSamePassword = await bcrypt.compare(
      result.data.password,
      user.password || "",
    );

    const {id, firstName, lastName, email} = user;

    if (!isSamePassword) {
      return res.status(401).json({
        message: "password or username incorrect",
      });
    }

    const token = signUser({id});

    return res.status(201).json({
      message: "signed in successfully",
      user: {
        firstName,
        lastName,
        email,
      },
      token,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({error: err});
  }
});

router.put(
  "/update-credentials",
  isLoggedIn,
  async (req: Request, res: Response) => {
    const userId = res.locals.id;
    console.log(userId);
    const {firstName, lastName, email} = req.body;

    try {
      const updateData: any = {};

      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (email) updateData.email = email;

      const user = await User.findOneAndUpdate({_id: userId}, updateData, {
        returnDocument: "after",
      });

      if (!user) {
        return res.status(404).json({
          message: "user not exists",
        });
      }

      return res.status(201).json({
        message: "user details updated",
        updatedUser: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({
        message: "internal server error",
      });
    }
  },
);

router.get("/bulk", isLoggedIn, async (req: Request, res: Response) => {
  const search = req.query.name as string;

  if (!search) {
    return res.status(400).json({ message: "Search query required" });
  }

  try {
    const result = await User.find({
      $or: [
        {firstName: {$regex: search, $options: "i"}},
        {lastName: {$regex: search, $options: "i"}},
      ],
    }).select("firstName lastName email");

    return res.status(200).json({
      message: "search completed",
      users: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

export default router;
