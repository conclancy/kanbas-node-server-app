import "dotenv/config";
import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from 'cors';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import mongoose from 'mongoose';
import QuizRoutes from "./Kanbas/quizes/routes.js";
import UserRoutes from "./Kanbas/users/routes.js";
import session from "express-session";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"

// console.log(DB_CONNECTION_STRING)

mongoose.connect(DB_CONNECTION_STRING);

// create an Express application
const app = express();
app.use(express.json());

// enable CORS
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// default server confirguation 
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
}

// configure the server to use cookies
app.use(session(sessionOptions));

// Lab 5 routes
Lab5(app);
Hello(app);

// Kanbas Routes 
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app)
UserRoutes(app);
QuizRoutes(app);

app.listen(process.env.PORT || 4000);