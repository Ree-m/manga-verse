import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
}
);

const User= models.User || model("User", UserSchema);

export default User;
