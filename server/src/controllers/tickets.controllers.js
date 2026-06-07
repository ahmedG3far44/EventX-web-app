import Event from "../models/event.js";
import Ticket from "../models/ticket.js";
import User from "../models/user.js";

export const buyTickets = async (req, res) => {
  try {
    const payload = req.body;
    const user = req.user;
    const eventId = payload.event;
    const newSeatsMap = payload.seats;
    const ticketQuantity = payload.quantity;
    const updatedRevenue = payload.price;
    await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: { revenue: updatedRevenue, availableSeats: -ticketQuantity },
        seatsMap: newSeatsMap,
      },
      { new: true }
    );
    const { ticketType, seatsNumber, price, quantity, paymentDetails } =
      payload;
  const ticketStatus = paymentDetails?.paymentMethod === "reserved" ? "reserved" : "paid";

  const ticket = new Ticket({
    event: eventId,
    user: user._id,
    ticketType,
    seatsNumber,
    price,
    quantity,
    paymentDetails,
    status: ticketStatus,
  });
  await ticket.save();
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
    const tickets = await Ticket.find();
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

export const getTicketById = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      data: ticket,
      success: true,
      message: "get ticket completed!!",
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
