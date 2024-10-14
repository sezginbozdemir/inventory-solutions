import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  entryPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  inStock: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
