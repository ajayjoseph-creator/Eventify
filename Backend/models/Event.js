import mongoose from "mongoose";
import { nanoid } from "nanoid"; 

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    dateTime: {
      type: Date,
      required: [true, "Date & Time is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publicLink: {
      type: String,
      unique: true,
      default: () => nanoid(10), 
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
