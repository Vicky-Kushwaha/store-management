import mongoose,{Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({

   name : {
   	type : String,
   	required : [true, "Please enter your name"],
   	trim : true
   },
   email : {
   	 type : String,
   	 rquired : [true, "Please enter your email id"],
   	 unique : [true, "User already exist with this email"]
   },
   storeName: {
       type : String,
       required : [true, "Please enter your store name"],
       trim : true
   },
   password:{
  	type: String,
  	required: [true,"Please enter your password"],
  	minLength: [8,"Passowrd should be greater than 8 characters"],
  	select : false
   },
   createdAt:{
    type: Date,
    default: Date.now
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date

})

userSchema.pre("save", async function(){
	if(!this.isModified("password")){
		return;
	}

	this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.generateToken = function(){
   try{

   	return jwt.sign({id:this._id},process.env.JWT_SECRET,{
   		expiresIn : "7d"
   	})

   }catch(err){
   	 console.log(err);
   }
}

userSchema.methods.getResetPasswordToken = function(){

   const resetToken = crypto.randomBytes(20).toString("hex");

   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

   return resetToken;

}

export const userModel = mongoose.models.user || model("user", userSchema);