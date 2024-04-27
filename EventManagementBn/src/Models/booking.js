// booking.js
import mongoose from "mongoose";

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User', // Reference to the User model
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event model
        required: true
    },
    numTickets: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
