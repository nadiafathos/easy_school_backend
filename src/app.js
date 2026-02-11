import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js";

//import des routes

import userRoute from  "./routes/user.route.js";
import childRoute from "./routes/child.route.js";
import classeRoute from "./routes/classe.route.js";
import homeworkRoute from "./routes/homework.route.js";
import mealRoute from "./routes/meals.route.js";
import reservationMealRoute from "./routes/reservationMeal.route.js";
import eventRoute from "./routes/event.route.js";
import participationEventRoute from "./routes/participationEvent.route.js";


dotenv.config();

const app =express();

//middleware global

app.use(express.json());

//Routes

app.use('/api/users',userRoute);
app.use("/api/children",childRoute);
app.use("/api/classes",classeRoute);
app.use("/api/homeworks",homeworkRoute);
app.use("/api/events",eventRoute);
app.use("/api/meals",mealRoute);
app.use("/api/participations",participationEventRoute);
app.use("/api/reservations",reservationMealRoute);


//route de test
app.get("/",(req,res) => {
    res.json({message:"API Easy_School Backend OK"});
});


export default  app;