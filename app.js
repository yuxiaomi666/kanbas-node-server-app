// const express = require("express");
import session from "express-session";

import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import cors from "cors";
import AssignmentRoutes from "./assignment/routes.js";
import "dotenv/config";

const conn = await mongoose.connect("mongodb://localhost:27017/kanbas");
console.log(`MongoDB Connected: ${conn.connection.host}`);

const app = express();
app.use(cors(
    {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(session(sessionOptions));

app.use(express.json());

FollowsRoutes(app);
LikesRoutes(app);
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
