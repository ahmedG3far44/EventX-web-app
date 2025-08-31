import Event from "../models/event.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
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

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
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

    // console.log(payload);

    // console.log();

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

/*
EXAMPLE REQUEST BODY STRUCTURE (WITHOUT seatsMap):
{
  "name": "Valorant Game Event",
  "description": "Professional e-sports tournament",
  "emoji": "🎮",
  "category": "E-Sports",
  "tags": ["gaming", "e-sports", "tournament", "valorant"],
  "datetime": "2024-05-15T16:00:00",
  "organizer": "Gaming League",
  "popularity": "High Popularity",
  "revenue": 0,
  "ticketTypes": {
    "type": "VIP",
    "name": "Premium Gaming Experience",
    "price": 75
  },
  "venue": {
    "name": "Gaming Arena",
    "capacity": 200,           // seatsMap will be generated to match this capacity
    "address": {
      "street": "123 Gaming Blvd",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02101"
    }
  }
}

GENERATED OUTPUT:
- seatsMap: 2D array of zeros (e.g., for capacity 200 → ~14x15 grid of zeros)
- availableSeats: 200 (matches venue.capacity)
- totalSeats: 200 (calculated from generated seatsMap)

VALIDATION RULES:
1. venue.capacity is used to generate seatsMap
2. seatsMap is automatically created as 2D array of zeros
3. availableSeats equals venue.capacity initially
4. revenue defaults to 0 for new events
5. All required fields must be present and properly formatted
*/

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    let event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Make sure user is event organizer or admin
    if (
      event.organizer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event",
      });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin/Organizer)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Make sure user is event organizer or admin
    if (
      event.organizer.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event",
      });
    }

    await event.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
