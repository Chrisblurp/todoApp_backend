import express from "express";
import { deleteController, getByIdController, loginController, passwordRecoveryController, registerController, updateController } from "../controllers/usercontroller.js";
import { loginChecker } from "../middleware/loginchecker.js";

const userRoute = express.Router();

userRoute.post("/register", registerController);

userRoute.post("/login", loginController);

// get user profile
userRoute.get("/profile", loginChecker, getByIdController);

userRoute.put("/:id",updateController);

userRoute.delete("/:id", deleteController);

userRoute.put("/passwordrecovery",passwordRecoveryController);

export default userRoute;

