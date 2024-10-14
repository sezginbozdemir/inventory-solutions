import mongoose from "mongoose";

const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const SequenceSchema = new Schema({
  orderSequence: { type: Number, default: 1000 },
});

const Sequence = mongoose.model("Sequnce", SequenceSchema);

export const orderIdGen = async () => {
  let sequenceNum = await Sequence.findOne();

  if (!sequenceNum) {
    let sequenceNum = new Sequence();
    await sequenceNum.save();

    return `Order#{sequenceNum}`;
  } else {
    const newSequenceNum = sequenceNum?.orderSequence + 1;
    await Sequence.updateOne({}, { orderSequence: newSequenceNum });

    return `Order#${newSequenceNum}`;
  }
};

const OrderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  orderId: { type: String },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  orderDate: { type: String, default: Date.now },
  status: { type: String, default: "Processing" },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
