import {userModel} from "@/server/models/user";
import {connectDB} from "@/server/db/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";

export const POST = async(req) => {
	try{

      await connectDB();

      const {email, password} = await req.json();

      if(!email || !password){
      	return NextResponse.json({
          success : false,
      		message : "All field are required"
      	})
      }

      const user = await userModel.findOne({email}).select("+password");

      if(!user){
      	return NextResponse.json({
          success : false,
      		message : "Invalid email or password"
      	})
      }

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
      	return NextResponse.json({
          success : false,
      		message : "Invalid email or password"
      	})
      }

      const token = user.generateToken();

      const res = NextResponse.json({
        success : true,
      	message : "Login successful"
      }, {status : 200});

      res.cookies.set("token",token,{
      	httpOnly : true,
      	maxAge : 7 * 24 * 60 * 60
      })

      return res;

	}catch(err){
		console.log("LOGIN ERROR", err.message);

		return NextResponse.json({
      success : false,
			error : err.message
		},{status : 500})
	}
}