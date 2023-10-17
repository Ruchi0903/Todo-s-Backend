// We basically created api from the timeframe 3:03:00 till 3:22:40 in the backend one shot 6pp present in the API & PARAMS chapter.
// Now in the route splitting-MVC part, we are going to create something called as Routes, imported from express
import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

// connecting the dotenv file
config({
    path: "./database/config.env",
});

// Using middleware for req.body to be valid. Sjpuld be used before the routes
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);
// CORS = CROSS-ORIGIN RESOURCE SHARING
// cors is used when we have to deploy our nodejs application. When we deploy, the url changes from localhost to some other domain name.
// So the node js app doesn't work as we can't send requests from some other domain to the localhost. So that's why we use cors.
// credentials: true. This is used so that we can pass our cookies otherwise we won't be able to get our cookies after deployment.


// middleware for routing // Now using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


// ROUTES
app.get("/", (req, res) => {
    res.send("Nicely Working");
});

// middleware for error -> whenever next() will be called by passing error so this middleware will be called and all function will be stopped.
app.use(errorMiddleware);