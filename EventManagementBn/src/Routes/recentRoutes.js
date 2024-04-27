import express from "express";
import eventController from "../Controllers/eventControllers.js";

const router = express.Router();


router.get("/newEvent", eventController.getUpcomingEvents);
router.get("/mostRecentEvents", eventController.getMostRecentEvents);


export default router