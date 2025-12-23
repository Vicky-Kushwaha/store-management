import {connectDB} from "@/server/db/connection";
import {NextResponse} from "next/server";
import {userModel} from "@/server/models/user";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async(req) => {
	try{

      await connectDB();

      // Auth (JWT from cookies)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let id = decoded.id;

      const user = await userModel.findById(id);

      if(!user){
      	 return NextResponse.json({
      	 	success : false,
      	 	message : "User not found"
      	 })
      }

      return NextResponse.json({
      	success : true,
      	user
      },{status : 200})

	}catch(err){
		console.log("User Detail ", err.message);

		return NextResponse.json({
			success : true,
			message : err.message
		},{status : 500})
	}
}