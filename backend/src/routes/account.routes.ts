/** @format */

import express from "express";
import {Request, Response} from "express";
import {isLoggedIn} from "../middleware/auth.middleware";
import {Account} from "../db";
import mongoose from "mongoose";

const router = express.Router();

router.get("/balance", isLoggedIn, async (req: Request, res: Response) => {
  const userId = res.locals.id;

  try {
    const account = await Account.findOne({userId: userId});
    return res.status(201).json({
      balance: account?.balance,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err,
    });
  }
});

router.post("/transfer", isLoggedIn, async (req: Request, res: Response) => {
  const userId = res.locals.id;
  const {amount, to} = req.body;
  const parsedAmount = Number(amount);

  if (!to || typeof to !== "string") {
    return res.status(400).json({
      message: "invalid account",
    });
  }

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({
      message: "invalid amount",
    });
  }

  if (to === userId) {
    return res.status(400).json({
      message: "cannot transfer to self",
    });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const senderAccount = await Account.findOne({userId: userId}).session(
      session,
    );

    if (!senderAccount) {
      await session.abortTransaction();
      return res.status(400).json({message: "sender account not found"});
    }

    if (parsedAmount > senderAccount.balance) {
      await session.abortTransaction();
      return res.status(400).json({message: "insufficient balance"});
    }

    const receiverAccount = await Account.findOne({userId: to}).session(
      session,
    );

    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "invalid account",
      });
    }

    await Account.updateOne(
      {userId: userId},
      {
        $inc: {
          balance: -parsedAmount,
        },
      },
    );

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: parsedAmount,
        },
      },
    );

    await session.commitTransaction();

    return res.status(200).json({
      message: "transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    return res.status(500).json({
      message: "internal server error",
    });
  } finally {
    session.endSession();
  }
});

export default router;
