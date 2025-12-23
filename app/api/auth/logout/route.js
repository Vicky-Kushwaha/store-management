import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export const GET = async(req) => {

	try{
     
     const cookieStore = await cookies();
     cookieStore.delete("token");

      return NextResponse.json({
      	success : true,
      	message : "Logout successful"
      })

	}catch(err){
		console.log("LOGOUT ERROR ", err.message);
		return NextResponse.json({
			success : false,
			error : err.message
		})
	}
}