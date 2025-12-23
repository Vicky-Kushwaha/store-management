import {connectDB} from "@/server/db/connection";
import {NextResponse} from "next/server";
import {productModel} from "@/server/models/product";
import cloudinary from "@/server/db/cloudinary";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async(req,{params}) => {
	try{

		await connectDB();
		const {id} = await params;

		const product = await productModel.findById(id);

		if(!product){
			return NextResponse.json({
            success : false,
				message : "Product not found"
			})
		}

		return NextResponse.json({
			success : true,
			message : "Product detail fetched successfully",
			product
		},{status : 200})

	}catch(err){

		console.log("Product Detail ", err.message);

		return NextResponse.json({
			success : false,
			error : err.message
		},{status : 500})

	}
}


export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const product = await productModel.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const image = formData.get("image");

    const updateData = {};

    // Handle IMAGE (only if new image is sent)
    if (image && image instanceof File && image.size > 0) {
      // delete old image
      if (product.image?.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      // convert file → base64
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64Image = `data:${image.type};base64,${buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "storeManagementProducts",
      });

      updateData.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Handle OTHER FORM FIELDS
    formData.forEach((value, key) => {
      if (key !== "image") {
        updateData[key] = value;
      }
    });

    // Auth (JWT from cookies)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    updateData.user = decoded.id;

    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Product Update Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};


export const DELETE = async(req,{params}) => {

   try{

   	 const {id} = await params;

   	 let product = await productModel.findById(id);

   	 if(!product){
   	 	return NextResponse.json({
   	 		success : false,
   	 		message : "Product not found"
   	 	});
   	 }

   	 await cloudinary.uploader.destroy(product.image.public_id);

   	 await productModel.findByIdAndDelete(id);

   	 return NextResponse.json({
   	 	success : true,
   	 	message : "Product deleted successfully"
   	 },{status : 200});


   }catch(err){

      console.log("Product Delete ", err.message);

      return NextResponse.json({
      	success : false,
      	error : err.message
      })

   }

}