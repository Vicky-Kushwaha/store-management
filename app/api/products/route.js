import {connectDB} from "@/server/db/connection";
import {NextResponse} from "next/server";
import {productModel} from "@/server/models/product";
import cloudinary from "@/server/db/cloudinary";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async(req) => {

  const obj = {};

	try{

		await connectDB();

		const formData = await req.formData()
		const image = formData.get("image");

        formData.forEach((value, key) => {
           if (!(value instanceof File)) {
              obj[key] = value;
           }
        });

         //Convert File → Buffer → Base64
         const bytes = await image.arrayBuffer();
         const buffer = Buffer.from(bytes);

         const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`;


		const result = await cloudinary.uploader.upload(base64Image, {
            folder: "storeManagementProducts",
         });
 
        obj.image = {
           public_id: result.public_id,
           url: result.secure_url,
        };

         const cookieStore = await cookies();
         const token = cookieStore.get("token")?.value;

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         obj.user = decoded.id;

        const product = await productModel.create(obj);

		return NextResponse.json({
           success : true,
           message : "Product added successfully",
           product
		},{status : 200})

		

	}catch(err){

		 await cloudinary.uploader.destroy(obj.image.public_id);

		console.log("Create Product ", err.message);

		return NextResponse.json({
			success : false,
			error : err.message
		},{status : 500})

	}
}



export const GET = async (req) => {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const keyword = searchParams.get("keyword") || "";
    const page = Number(searchParams.get("page")) || 1;

    const resultPerPage = 9;
    const skip = resultPerPage * (page - 1);

    // Search Query
    const query = {};

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

     const cookieStore = await cookies();
     const token = cookieStore.get("token")?.value;

     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     query.user = decoded.id;

    const totalProductCounts = await productModel.countDocuments();
    const filterProductCounts = await productModel.countDocuments(query);

    const products = await productModel
      .find(query)
      .limit(resultPerPage)
      .skip(skip);

    return NextResponse.json(
      {
        success: true,
        totalProductCounts,
        filterProductCounts,
        resultPerPage,
        products,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Get Products Error:", err.message);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
};

