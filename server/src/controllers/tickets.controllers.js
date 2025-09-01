import Event from "../models/event.js";
import Ticket from "../models/ticket.js";


export const buyTickets = async (req, res) => {
  try {

    // Ticket.dropIndex("ticketNumber_1");
    const payload = req.body;
    // const user = req.user;

    const eventId = payload.event;
    const newSeatsMap = payload.seats;
    const availableSeats = payload.quantity;
    const updatedRevenue = payload.price;

    // update event seats map
    // update event available tickets reduce the number tickets
    // update event revenue
    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $inc: { revenue: updatedRevenue },
        availableSeats,
        seatsMap: newSeatsMap,
      },
      { new: true }
    );

    console.log(event);

    // create a new ticket to the user
    const { user, ticketType, seatsNumber, price, quantity, paymentDetails } =
      payload;
    const ticket = new Ticket({
      event: eventId,
      user,
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
export const getTicketsByEventId = async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    res.status(201).json({
      data: "buyTickets",
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

// Ticket Billing Information:

// 1- event info
// #############################################
// - title => Summer Pool Event
// - date => 24-5-2025
// - time =>  09:30 PM
// - status => active, completed, canceled
// - description => description text about the event
// - venue => location: NYC, USA

// 2- tickets info
// #############################################
// - tickets types
// - tickets types price
// - tickets quantity
// - total tickets price

// example
// #############################################
// vip => 2 => $40
// seat number: vip-22, vip-23
// general => 5 => $50
// seat number: general-12, general-13, general-14, general-15, general-16
// total => 7 => $70

// 3- payment info
// #############################################
// - payment status => failed , completed, refund ...
// - payment method => wallet , stripe, debit card ...
// - payment datetime => 24-4-2025 8:00 PM
// - transaction number
