import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  adress: { type: String, required: true },
  phone: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
