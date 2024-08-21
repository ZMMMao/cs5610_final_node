import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
console.log("Connecting to MongoDB at:", CONNECTION_STRING);

const app = express();
app.use(
  cors({
    // support cookies
    credentials: true,
    // restrict cross origin resource sharing to the react application
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  }),
);
// make sure this statement occurs AFTER setting up CORS
app.use(express.json());
// configure server session after cors
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
