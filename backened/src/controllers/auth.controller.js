import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, please use a different one" });
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = new User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        });

        // TODO: CREATE THE USER IN STREAM AS WELL

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, { 
            expiresIn: '7d' 
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Helps prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        })

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
            success: true
        })


    } catch (error) {
        console.log("Error in signup:", error);
        return res.status(500).json({ message: "Failed to create the user" });
    }
}

export async function login(req, res) {
    res.send('Login Route')
}

export async function logout(req, res) {
    res.send('Logout Route')
}