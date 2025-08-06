import { upsertStreamUser } from "../lib/stream.js";
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

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        });

        //! CREATE THE USER IN STREAM AS WELL

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log(`Stream user upserted for ${newUser.fullName}`);
        } catch (error) {
            console.log("Error upserting Stream user:", error);
        }
      
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
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '7d' 
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        res.status(200).json({
            message: "Login successful",
            user,
            success: true
        });
    } catch (error) {
        console.log("Error in login:", error);
        res.status(500).json({ message: "Failed to login" });
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({
        message: "Logout successful",
        success: true
    })
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;

        const {fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"
                ].filter(Boolean),
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true });

        if(!updatedUser) {
            res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // TODO: UPDATE THE USER INFO IN STREAM

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            });
            console.log(`Stream user updated on onboarding for ${updatedUser.fullName}`);
        } catch (streamError) {
            console.log("Error updating Stream user on onboarding:", streamError.message);
        }

        return res.status(200).json({
            message: "User onboarded successfully",
            user: updatedUser,
            success: true
        })
    } catch (error) {
        console.log("Error in onboard:", error);
        return res.status(500).json({
            message: "Failed to onboard user",
            success: false
        });
    }
};