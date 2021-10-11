import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../../Database/user/index";

const Router = express.Router();

/*
Route     =     /signup
Desc      =     Register new user
Params    =     None
Access    =     Public
Method    =     POST
*/

Router.post("/signup", async (req, res) => {
  try {
    const { email, fullName, password, phoneNumber } = req.body.credentials;
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    //check whether number or email alredy exists

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User already exists" });
    }

    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password.bcryptSalt);

    // Saving to DataBase
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    const token = jwt.sign({user:{fullName, email}},"Zomato");
    return res.status(200).json({token, status: "success"});

  } catch (error) {
    return res.status(500).json({ error: message });
  }
});
