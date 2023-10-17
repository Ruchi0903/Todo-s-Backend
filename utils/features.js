import jwt from "jsonwebtoken";


export const sendCookie = (user, res, message, statusCode = 200) => {
    // A token with some configurations i.e payload, signature, expiry, etc. 
    // payload as user id and email because only this is sufficient to extract the user information
    // Here, the sign method accepts payload, secret jwt key (here ka JWT_SECRET stored in config.env file), and expiry time then generates a token.
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

// console.log(process.env.NODE_ENV)
// console.log(process.env.NODE_ENV === "Development");

    // we need cookie here because we want to login after registering. And for cookie, we need a token so we're using jwt.
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message,
        });
    // An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data. It provides a gate that prevents the specialized cookie from being accessed by anything other than the server
    // SameSite = "none" -> cookies will be sent in all contexts, i.e., in responses to both first party and cross-site requests. If sameSite = none, the cookie secure attribute must also be set otherwise the cookie will be blocked.
    // Read more about these things on mdn(developer.mozilla.org)
};