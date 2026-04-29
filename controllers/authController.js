import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    
    
    const { name, email, password } = req.body;

    
    
    const existingUser = await User.findOne({email});

  

    if (existingUser) {
      return res.status(400).json({ error: "User already exist " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(user)

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    res.status(200).json({ message:"User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

///Login

export const login = async (req, res) => {
    console.log("LOGIN ROUTE HIT!")
  try {
    const { name,email,password } = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passMatch = await bcrypt.compare(password,user.password);
    if (!passMatch) {
      return res.status(400).json({ error: "Password is not matching" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
