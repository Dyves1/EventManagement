// event.js
import mongoose from "mongoose";
import Booking from "./booking.js";

// Define the event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tickets: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    bookedTickets: {
        type: Number,
        default: 0
    },
    bookings: [Booking.schema], // Array of booking sub-documents
    createdAt: {
        type: String,
        default: Date.now
    }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
