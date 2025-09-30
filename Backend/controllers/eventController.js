import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, description } = req.body;

    const event = await Event.create({
      title,
      dateTime,
      location,
      description,
      user: req.user._id, 
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id }).sort({
      dateTime: 1,
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event && event.user.toString() === req.user._id.toString()) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event && event.user.toString() === req.user._id.toString()) {
      await event.deleteOne();
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPublicEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ publicLink: req.params.publicLink });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};