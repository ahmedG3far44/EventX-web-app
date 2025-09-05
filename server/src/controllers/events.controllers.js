import Event from "../models/event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      throw new Error("id is missing!!");
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const createSeatsMap = (capacity) => {
  const cols = Math.ceil(Math.sqrt(capacity * 1.2));
  const rows = Math.ceil(capacity / cols);
  const seatsMap = [];
  let remainingSeats = capacity;
  for (let row = 0; row < rows; row++) {
    const seatsInThisRow = Math.min(cols, remainingSeats);
    const rowArray = Array(seatsInThisRow).fill(0);
    seatsMap.push(rowArray);
    remainingSeats -= seatsInThisRow;
    if (remainingSeats <= 0) break;
  }
  console.log(seatsMap);
  return seatsMap;
};

export const createEvent = async (req, res) => {
  try {
    const payload = req.body;
    const totalSeats = payload.venue.capacity;
    const seatsMap = createSeatsMap(totalSeats);
    const seatsAmount = totalSeats;
    const availableSeats = totalSeats;
    const initialRevenue = 0;
    const event = new Event({
      ...payload,
      seatsMap,
      seatsAmount,
      availableSeats,
      revenue: initialRevenue,
    });
    await event.save();

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const status = payload.status;
    const event = await Event.findByIdAndUpdate(id, {
      status,
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    await event.save();
    res.status(200).json({
      success: true,
      message: `Event status updated to ${status}`,
      data: event,
    });
  } catch (error) {
    console.error("Error updating event status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event status",
      error: error.message,
    });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event id is not found",
      });
    }
    res.status(200).json({
      success: true,
      data: "Event deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
