import { Schema, model, models } from "mongoose";
import { bcrypt } from 'bcryptjs';

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
        required:true,
        min:8
    }
},{
    timestamps:true
}
);


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

const User= models.User || model("User", UserSchema);

export default User;
