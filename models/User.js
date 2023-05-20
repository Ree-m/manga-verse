import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name:{
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
    }
},{
    timestamps:true
}
);


const User= models.User || model("User", UserSchema);

export default User;
