import express from "express";
import bookingController from "../Controllers/bookingController.js";
import isAuthenticated from '../Middlewares/checkIsLoggedIn.js'


const router = express.Router();

router.post('/:eventId',isAuthenticated,bookingController.createBooking)
router.delete('/:eventId',isAuthenticated,bookingController.cancelBooking)
router.post('/:eventId',isAuthenticated,bookingController.getEventBookings)
router.get('/',isAuthenticated,bookingController.getUserBookings)









export default router