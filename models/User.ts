import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    username: String,
    email: {type:String, unique:true},
    provider:String,
    providerId:String,},
    {timestamps:true}
);

const User = models.Users || model("Users", userSchema);

export default User;