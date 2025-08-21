import Event from "../models/event.js";
import Ticket from "../models/ticket.js";

export const buyTickets = async (req, res) => {
  try {
    // get user info from token
    // get event info by eventId
    // check the event has available seats
    // get number of tickets by type
    // calculate the total number price
    // check there is enough balance 
    // withdraw the amount of total price tickets from user wallet
    // mutate the all billing info to db
    // return response with qrCode url and billing info
    res.status(201).json({
      data: buyTickets,
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
