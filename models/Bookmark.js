import { Schema, model, models } from "mongoose";

const BookmarkSchema = new Schema({
    nameOfManga:{
        type:String,
        required:true,
       
    },
   
},{
    timestamps:true
}
);

const Bookmark= models.Bookmark || model("Bookmark", BookmarkSchema);

export default Bookmark;
