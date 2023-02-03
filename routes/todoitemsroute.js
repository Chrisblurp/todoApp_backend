import express from "express";
import { deleteTodoItemsController, getTodoItemsController, todoItemsController, updateTodoItemsController } from "../controllers/todoitemscontrollers.js";

const todoItemsRoute = express.Router();

// save todo items
todoItemsRoute.post("/items",todoItemsController);

// get todo items
todoItemsRoute.get("/items", getTodoItemsController);

// update todo items 
todoItemsRoute.put("/:id", updateTodoItemsController);

// delete todo items
todoItemsRoute.delete("/:id", deleteTodoItemsController);




export default todoItemsRoute;