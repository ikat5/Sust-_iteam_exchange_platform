import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
    min: [0, "Price cannot be negative"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  condition: {
    type: String,
    required: true,
    trim: true,
    enum: ["new", "used", "refurbished"],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  productImage: {
  type: [String],   // array of strings
  validate: [arr => arr.length <= 5, "Maximum 5 images allowed"],
  required: true
}
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);