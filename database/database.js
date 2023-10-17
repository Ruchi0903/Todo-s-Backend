import mongoose from "mongoose";

// connecting db

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "BackendNodeApi",
    })
        .then(() => { console.log("DB connected!") })
        .catch((e) => { console.log(e) })

};