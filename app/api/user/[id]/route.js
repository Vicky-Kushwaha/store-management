import {connectDB} from "@/server/db/connection";
import {NextResponse} from "next/server";
import {userModel} from "@/server/models/user";

export const PUT = async(req,{params}) => {
	try{

	 await connectDB();

	 const {id} = await params;

     let user = await userModel.findById(id);

     if(!user){
     	return NextResponse.json({
     		success : false,
     		message : "User not found"
     	})
     }
	 
	 const {name, email, storeName} = await req.json();

	 if(!name || !email || !storeName){
	 	return NextResponse.json({
	 		success : false,
	 		message : "All fields are required"
	 	})
	 }

	 user = await userModel.findByIdAndUpdate(id,{$set : {name, email, storeName}},{new : true});	

	 return NextResponse.json({
        success : true,
	 	message : "User updated successfully",
	 	user
	 },{status : 200})

	}catch(err){
		console.log("User Updating ", err.message);

		return NextResponse.json({
			success : false,
			error : err.message
		},{status : 500})
	}
}
