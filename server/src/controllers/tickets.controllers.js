import Event from "../models/event.js";
import Ticket from "../models/ticket.js";
import User from "../models/user.js";

export const buyTickets = async (req, res) => {
  try {
    const payload = req.body;
    const user = req.user;

    console.log(payload);
    console.log(user);

    const eventId = payload.event;
    const newSeatsMap = payload.seats;
    const availableSeats = payload.quantity;
    const updatedRevenue = payload.price;

    // update event seats map
    // update event available tickets reduce the number tickets
    // update event revenue
    await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: { revenue: updatedRevenue },
        availableSeats,
        seatsMap: newSeatsMap,
      },
      { new: true }
    );

    const { ticketType, seatsNumber, price, quantity, paymentDetails } =
      payload;
    const ticket = new Ticket({
      event: eventId,
      user: user._id,
      ticketType,
      seatsNumber,
      price,
      quantity,
      paymentDetails,
    });

    await ticket.save();

    console.log(ticket);

    res.status(201).json({
      data: ticket,
      success: true,
      message: "ticket checkout completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);
    const tickets = await Ticket.find();
    console.log(tickets);

    let ticketsInfo = [];

    for (const ticket of tickets) {
      const user = await User.findOne({ _id: ticket.user });

      ticketsInfo.push({ user, ticket });
    }

    res.status(200).json({
      data: ticketsInfo,
      success: true,
      message: "ticket all tickets completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const payload = req.body;
    const { userId } = req.params;

    console.log(payload);

    console.log(userId);

    const tickets = await Ticket.find({ user: userId });

    res.status(200).json({
      data: tickets,
      success: true,
      message: "get user tickets completed!!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong!!",
      success: false,
      message: error.message,
    });
  }
};
