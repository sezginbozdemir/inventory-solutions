import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
//const ObjectId = Schema.Types.ObjectId;

const TaskSchema = new Schema({
  description: { type: String, required: true },
  dueDate: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "employee" },
  active: { type: String, default: "pending" },
  tasks: [TaskSchema],
});

EmployeeSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
