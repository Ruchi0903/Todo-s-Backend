import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// newTask will run after isAuthenticated is executed and hence we will be getting the req object from the isAuth.. function which will be further used in "./controllers/task.js"
router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTask);

router
    .route("/:id")
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

export default router;