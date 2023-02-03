import Items from "../Models/todoitemsmodel.js";


export const todoItemsController = async (req, res) => {
   
    try{
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
        const allTodoItems = await Items.find({})
        res.status(200).json(allTodoItems)
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