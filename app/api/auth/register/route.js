import {userModel} from "@/server/models/user";
import {NextResponse} from "next/server";
import {connectDB} from "@/server/db/connection";

export const POST = async(req) => {
  try{

  	await connectDB();

  	const {name,email,storeName,password} = await req.json();

  	if(!name || !email || !password || !storeName){
  		return NextResponse.json({
       success : false, 
       message: "All fields are required"
        })
  	}

  	const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
            success : false,
            message: "User already exists"
          }
      );
    }

    const user = await userModel.create({ name, email, password, storeName });

    return NextResponse.json(
      {
        success : true,
        message: "User registered successfully",
        // user: {
        //   id: user._id,
        //   name: user.name,
        //   email: user.email,
        // },
      },
      { status: 201 }
    );


  }catch(err){
  	 console.error("REGISTER ERROR:", err.message);

    return NextResponse.json(
      { success : false, error: err.message },
      { status: 500 }
    );
  }
}