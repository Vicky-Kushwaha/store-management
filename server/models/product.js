import mongoose,{Schema, model} from "mongoose";

const productSchema = new Schema({
	name : {
		type : String,
		required : [true, "Please enter the name of product"],
		trim : true
	},
	description : {
		type : String,
	},
	price : {
		type : Number, 
		required : [true, "Please enter the price of product"]
	},
	image :{
			public_id : {type: String, required : true},
			url : {type: String, required: true}
		},
	category : {
		type : String,
		required : [true, "Please enter the category of product"],
		enum : [
			'Electronics',
            'Clothing',
            'Food & Beverages',
            'Home & Garden',
            'Sports & Outdoors',
            'Books & Stationery',
            'Health & Beauty',
            'Toys & Games',
            'Other'
		]
	},
	rack : {
		type : String,
		required : [true, "Please enter your rack name"]
	},
	stock: {
        type : Number,
        default : 1
	},
	user : {
		type : Schema.Types.ObjectId,
		ref : "user",
		required : [true, "User for adding this product is not found"]
	},
	createdAt : {
		type : Date,
		default : Date.now
	}
})

export const productModel = mongoose.models.product || model("product", productSchema);
