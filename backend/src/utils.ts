/** @format */

import jwt from "jsonwebtoken";

const adminSecret = process.env.ADMIN_SECRET || "";
const userSecret = process.env.USER_SECRET || "";

if (!adminSecret || !userSecret) {
  throw new Error("Secret not loaded");
}

export function signUser(payload: any) {
  return jwt.sign(payload, userSecret, {expiresIn: "1d"});
}

export function signAdmin(payload: any) {
  return jwt.sign(payload, adminSecret, {expiresIn: "1d"});
}

export function verifyUser(token: string) {
  try {
    const res = jwt.verify(token, userSecret) as {id: string};
    return res.id;
  } catch (err) {
    return err;
  }
}

export function verifyAdmin(token: string) {
  try {
    const res = jwt.verify(token, adminSecret) as {id: string};
    return res.id;
  } catch (err) {
    return err;
  }
}
