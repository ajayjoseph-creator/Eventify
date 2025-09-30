import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  deleteEvent,
  getPublicEvent,
} from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.route("/")
  .post(protect, createEvent)  // Create event
  .get(protect, getEvents);   // Get all user events

router.route("/:id")
  .get(protect, getEventById)  // Get single event
  .delete(protect, deleteEvent); // Delete event

  router.get("/public/:publicLink", getPublicEvent);

export default router;
