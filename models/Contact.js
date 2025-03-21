// models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    linkedId: { type: mongoose.Schema.Types.ObjectId, default: null },
    linkPrecedence: { type: String, enum: ["primary", "secondary"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;