import mongoose from "mongoose";

// creating schema
 const TodoItemSchema = new mongoose.Schema({
    item:{ 
        type:String,
        required:true
    }
});

const Items = mongoose.model("items", TodoItemSchema);
export default Items;