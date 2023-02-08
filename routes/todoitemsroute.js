import express from "express";
import { deleteTodoItemsController, getTodoItemsController, todoItemsController, updateTodoItemsController } from "../controllers/todoitemscontrollers.js";
import { loginChecker } from "../middleware/loginchecker.js";

const todoItemsRoute = express.Router();
// save todo items
todoItemsRoute.post("/items",loginChecker, todoItemsController);

// get todo items
todoItemsRoute.get("/items", loginChecker, getTodoItemsController);

// update todo items 
todoItemsRoute.put("/:id", loginChecker, updateTodoItemsController);

// delete todo items
todoItemsRoute.delete("/:id", loginChecker, deleteTodoItemsController);




export default todoItemsRoute;