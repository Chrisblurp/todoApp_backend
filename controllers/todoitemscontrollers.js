import Items from "../Models/todoitemsmodel.js";
import User from "../Models/usermodel.js";


export const todoItemsController = async (req, res) => {
    try{
        const profiler = await User.findById(req.userAuth)
        if(!profiler){
          return res.json({
            "message":"error",
            status:"you have to be logged in to be able to add items "
          })  
        }
const newItem = new Items({
    item: req.body.item
})
// save the item in the database
const saveItems = await newItem.save();
res.status(200).json({
    status: "sucess",
    message: "items added succesfuly"
});

}catch(error){
        res.json(error.message);
    }
}

export const getTodoItemsController = async (req, res) => {
    try{
        const profiler = await User.findById(req.userAuth)
        const allTodoItems = await Items.find({})
        if(profiler){
            return res.status(200).json(allTodoItems)
        }
        return res.json({
            "message":"this user doesnt have any items"
        })
    }catch(error){
        res.json(error.message)
    }
}

export const updateTodoItemsController = async (req, res) => {
    try{
        
        const updateItem = await Items.findByIdAndUpdate(req.params.id,{$set: req.body})
        res.status(200).json("item updated successfuly");
    }catch(error){
        res.json(error.message)
    }
}

export const deleteTodoItemsController = async (req, res) =>{
    try{
        const deleteItem = await Items.findByIdAndDelete(req.params.id)
        res.status(200).json("item Deleted successfuly");
    }catch(error){
        res.json(error.message);
    }
}