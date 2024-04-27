import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
 fullname: {
    type:String,
    required: true, 
   
 },
 email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
          // Email regex for basic email validation
          return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
  }
 },
 password: {
    type: String,
    required: true,
    minLength:6
 },
 isAdmin: {
   type: Boolean,
   required:true,
   default:false


 },
 createdAt:  {
    type:String,
    default: Date.now
   
 }
})
// define the compare password function (this help to compare the harshed password and the entered password)

userSchema.methods.comparePassword=async function(password){
    const match = await bcrypt.compare(password, this.password);
    return match
}
const User = mongoose.model("User",userSchema)

export default User