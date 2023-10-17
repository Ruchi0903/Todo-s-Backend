import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });
        // here, req.user is accessible because in the "./routes/task.js" we have used isAuthenticated func present in "../middlewares/auth.js", and in that func we have req object which contains all the data.

        res.status(201).json({
            success: true,
            message: "Task added successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async (req, res, next) => {
    try {

        // able to access req obj because again in the routes folder for task.js file, we have used isAuthenticated middleware and it contains req object so we will be able to access all it's data.
        const userid = req.user._id;

        // those user's tasks will be shown who are logged in.
        const tasks = await Task.find({ user: userid });

        // displaying all the tasks
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {

        // id obtained by using params as dynamic routing is done for updating tasks
        const { id } = req.params;

        // finding the task by the id.
        const task = await Task.findById(id);

        // check if there is a task or not, if no, then it will give error so check it first.
        if (!task) return next(new ErrorHandler("Invalid", 404));
        // in the above line, there was some code which is now in error.js in the middleware folder.


        // if task is completed mark isCompleted as true (default is false, given in task's schema) or vice versa.
        task.isCompleted = !task.isCompleted;
        // saving the changes made in the task.
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id);

        // ErrorHandler is a class inside the error.js file inside middleware folder.
        if (!task) return next(new ErrorHandler("Task Not Found", 404));
        // in the above line, there was some code which is now in error.js in the middleware folder.

        task.isCompleted = !task.isCompleted;

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted",
        });
    } catch (error) {
        next(error);
    }
};