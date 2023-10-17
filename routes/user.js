import express from "express";
// import { User } from "../models/user.js";
import { getMyProfile, register, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


// With the help of router, the thing which we do in app.get or app.post etc can be done using router and router has an advantage. It will be more organized, i.e., the routes can be written separately in the routes folder
// For eg-> all the users wale routes will be inside the user.js file inside the routes folder
const router = express.Router();

// , route likhna wha se start kro user.js (present in routes folder) jaha se routes change ho rhe
// For eg-> /user/new, /user/all, /user/...smth. To /user chor ke age ka likho qki ek custom route for users se start hone wale urls ke liye middleware already hmne likh diya h in server.js
// Now to clear this file more, the functions inside the .get and .post should be written inside controller folder which has a file known as user.js. And make a function there and write that function here but not the logic, the logic must be written in the controller only.

// router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
// here since we have used next in the isAuthenticated middleware, therefore after isAuthentication is executed, getMyProfile will be executed.

export default router;