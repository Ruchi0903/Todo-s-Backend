import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    // we can use cookie parser or isAuthenticated (in the authentication chapter of this video).
    // we can use cookie parser to get the id from the token, but we must be logged in for that.
    const { token } = req.cookies;


    // if didn't get the token. (when in postman, after logging in, if we delete the cookie, we'll get this message that we should login first.)
    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First"
        });

    // when we get the token we will be able to get more data from the token.
    // and hence, we'll be able to get the id from the token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // req object will have this req.user after logging in. It will have all the user's data.
    req.user = await User.findById(decoded._id);
    next();

}

// this middleware will be used where logging in is mandatory in the routes folder, user.js file
// for eg in getMyProfile wala route