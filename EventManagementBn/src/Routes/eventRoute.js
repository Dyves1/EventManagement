import express from "express";
import eventController from "../Controllers/eventControllers.js";

const router = express.Router();

router.post('/',eventController.createEvent)
router.get('/', eventController.getAllEvents)
router.get('/:id',eventController.getEvent)
router.put("/:id", eventController.updateEvent)
router.delete("/:id", eventController.deleteEvent)



export default router