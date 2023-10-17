import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// will be used if we want admin dashboard kinda thing.
// export const getAllUsers = async (req, res) => { };

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // finding the user in db through email.
        // wasn't able to access password through user.password for isMatch, therefore, selecting manually.
        // + is used so that every data, we can get every data along with password.
        const user = await User.findOne({ email }).select("+password");

        // if user doesn't exist in db then give this error
        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        // here user.password won't be able to access the password because in ./models/user.js the inside the schema we have written select: false for "password".
        // so we have to manually do select.

        // if the data doesn't match
        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));


        // if the data matches
        sendCookie(user, res, `Welcome Back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        // if user exists then give this error.
        if (user) return next(new ErrorHandler("User already exists", 400));


        // hash the password first then create the user if it doesn't exist in the db
        const hashedPassword = await bcrypt.hash(password, 10);

        // if the user is not there in db then create the user.
        user = await User.create({ name, email, password: hashedPassword });

        // The code here was pasted into utils folder which has features.js file. So that the same part can be used in login function as well without writing it 2 times separately for login and reigster, improved code readability.
        sendCookie(user, res, "Registered Successfully", 201);

    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {
    //   the code previously present here is now in the file auth.js which is inside the middlewares folder.
    res.status(200).json({
        success: true,
        user: req.user,
    });

};

// in logout, we have to delete the cookie so that we will be able to logout.
export const logout = (req, res) => {
    //   the code previously present here is now in the file auth.js which is inside the middlewares folder.
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });

};