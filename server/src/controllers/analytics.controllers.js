import User from "../models/user.js";
import Event from "../models/event.js";
import Ticket from "../models/ticket.js";

// Helper function to generate colors for charts
const generateColors = () => [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

// Get overall analytics (all events)
export const getOverallAnalytics = async (req, res) => {
  try {
    // Total number of events
    const totalEvents = await Event.countDocuments();

    // Total number of tickets sold
    const totalTickets = await Ticket.countDocuments({ status: "paid" });

    // Total revenue from all paid tickets
    const revenueResult = await Ticket.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Top 5 events by revenue
    const topEventsByRevenue = await Ticket.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: "$event",
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          ticketsSold: { $sum: "$quantity" },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },
      {
        $project: {
          name: "$eventDetails.name",
          revenue: 1,
          ticketsSold: 1,
          category: "$eventDetails.category",
          datetime: "$eventDetails.datetime",
        },
      },
    ]);

    // Ticket sales data by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const ticketSalesData = await Ticket.aggregate([
      {
        $match: {
          status: "paid",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$quantity" },
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                },
              },
            },
          },
          totalSales: 1,
          revenue: 1,
        },
      },
    ]);

    // Event categories distribution (interests data)
    const categoriesData = await Event.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const totalCategoryEvents = categoriesData.reduce(
      (sum, cat) => sum + cat.count,
      0
    );
    const colors = generateColors();

    const interestsData = categoriesData.map((category, index) => ({
      name: category._id,
      value: category.count,
      percentage: `${((category.count / totalCategoryEvents) * 100).toFixed(
        1
      )}%`,
      color: colors[index % colors.length],
    }));

    // Locations data based on venue city
    const locationsData = await Event.aggregate([
      { $match: { "venue.address.city": { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$venue.address.city",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const totalLocationEvents = locationsData.reduce(
      (sum, loc) => sum + loc.count,
      0
    );

    const locationsBarData = locationsData.map((location, index) => ({
      name: location._id,
      value: location.count,
      color: colors[index % colors.length],
      percentage: `${((location.count / totalLocationEvents) * 100).toFixed(
        1
      )}%`,
    }));

    const locationTableData = locationsData.map((location, index) => ({
      location: location._id,
      count: location.count,
      color: `bg-${
        [
          "blue",
          "red",
          "pink",
          "yellow",
          "green",
          "purple",
          "indigo",
          "gray",
          "orange",
          "teal",
        ][index % 10]
      }-500`,
    }));

    // Mock social media data (you can integrate with real APIs later)
    const socialMediaData = [
      {
        platform: "Instagram Mentions",
        count: Math.floor(totalEvents * 52 + Math.random() * 1000),
        icon: "Instagram",
        color: "text-pink-500",
      },
      {
        platform: "Facebook Shares",
        count: Math.floor(totalEvents * 38 + Math.random() * 1000),
        icon: "Facebook",
        color: "text-blue-600",
      },
      {
        platform: "Twitter Tweets",
        count: Math.floor(totalEvents * 12 + Math.random() * 500),
        icon: "Twitter",
        color: "text-sky-500",
      },
      {
        platform: "Event Check-ins",
        count: totalTickets,
        icon: "QrCode",
        color: "text-gray-600",
      },
    ];

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalEvents,
          totalTickets,
          totalRevenue,
          totalUsers: await User.countDocuments(),
        },
        topEventsByRevenue,
        ticketSalesData,
        interestsData,
        locationsBarData,
        locationTableData,
        socialMediaData,
      },
    });
  } catch (error) {
    console.error("Error fetching overall analytics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
      error: error.message,
    });
  }
};

// Get analytics for a specific event
export const getEventAnalytics = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Get tickets for this event
    const eventTickets = await Ticket.find({ event: eventId, status: "paid" });

    // Calculate revenue for this event
    const eventRevenue = eventTickets.reduce(
      (sum, ticket) => sum + ticket.price * ticket.quantity,
      0
    );

    // Ticket type distribution
    const ticketTypeData = await Ticket.aggregate([
      { $match: { event: eventId, status: "paid" } },
      {
        $group: {
          _id: "$ticketType",
          count: { $sum: "$quantity" },
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);

    const totalEventTickets = ticketTypeData.reduce(
      (sum, type) => sum + type.count,
      0
    );
    const colors = generateColors();

    const ticketTypesData = ticketTypeData.map((type, index) => ({
      name: type._id,
      value: type.count,
      percentage: `${((type.count / totalEventTickets) * 100).toFixed(1)}%`,
      color: colors[index % colors.length],
      revenue: type.revenue,
    }));

    // Daily ticket sales for this event (last 30 days or since event creation)
    const eventCreated = new Date(event.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate =
      eventCreated > thirtyDaysAgo ? eventCreated : thirtyDaysAgo;

    const dailySales = await Ticket.aggregate([
      {
        $match: {
          event: eventId,
          status: "paid",
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          tickets: { $sum: "$quantity" },
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Payment methods distribution
    const paymentMethodsData = await Ticket.aggregate([
      { $match: { event: eventId, status: "paid" } },
      {
        $group: {
          _id: "$paymentDetails.paymentMethod",
          count: { $sum: 1 },
        },
      },
    ]);

    const paymentMethods = paymentMethodsData.map((method, index) => ({
      method: method._id || "Unknown",
      count: method.count,
      color: colors[index % colors.length],
    }));

    // Event capacity analytics
    const occupancyRate = (
      ((event.seatsAmount - event.availableSeats) / event.seatsAmount) *
      100
    ).toFixed(1);

    res.status(200).json({
      success: true,
      data: {
        event: {
          id: event._id,
          name: event.name,
          category: event.category,
          datetime: event.datetime,
          venue: event.venue,
          totalSeats: event.seatsAmount,
          availableSeats: event.availableSeats,
          occupancyRate: `${occupancyRate}%`,
        },
        overview: {
          totalTicketsSold: totalEventTickets,
          totalRevenue: eventRevenue,
          averageTicketPrice:
            totalEventTickets > 0
              ? (eventRevenue / totalEventTickets).toFixed(2)
              : 0,
        },
        ticketTypesData,
        dailySales,
        paymentMethods,
        seatsAnalytics: {
          totalSeats: event.seatsAmount,
          soldSeats: event.seatsAmount - event.availableSeats,
          availableSeats: event.availableSeats,
          occupancyPercentage: parseFloat(occupancyRate),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching event analytics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event analytics",
      error: error.message,
    });
  }
};

// Get user analytics
export const getUserAnalytics = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Users by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent user registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentRegistrations = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // User verification status
    const verificationStats = await User.aggregate([
      {
        $group: {
          _id: "$isVerified",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        usersByRole,
        recentRegistrations,
        verificationStats,
      },
    });
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user analytics",
      error: error.message,
    });
  }
};

// Get revenue analytics
export const getRevenueAnalytics = async (req, res) => {
  try {
    const { period = "6months" } = req.query;

    let startDate = new Date();
    switch (period) {
      case "1month":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "3months":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case "6months":
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "1year":
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(startDate.getMonth() - 6);
    }

    // Revenue by period
    const revenueByPeriod = await Ticket.aggregate([
      {
        $match: {
          status: "paid",
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          tickets: { $sum: "$quantity" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          period: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                },
              },
            },
          },
          revenue: 1,
          tickets: 1,
        },
      },
    ]);

    // Revenue by event category
    const revenueByCategory = await Ticket.aggregate([
      { $match: { status: "paid" } },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "eventDetails",
        },
      },
      { $unwind: "$eventDetails" },
      {
        $group: {
          _id: "$eventDetails.category",
          revenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          tickets: { $sum: "$quantity" },
        },
      },
      { $sort: { revenue: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        revenueByPeriod,
        revenueByCategory,
      },
    });
  } catch (error) {
    console.error("Error fetching revenue analytics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue analytics",
      error: error.message,
    });
  }
};

export const getAgeDistributionFromAgeField = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    let query = {};
    if (eventId) {
      query = { event: eventId };
    }
    
    const ageDistribution = await Ticket.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userData'
        }
      },
      { $unwind: '$userData' },
      { $match: { 'userData.age': { $exists: true, $ne: null } } },
      {
        $addFields: {
          ageGroup: {
            $switch: {
              branches: [
                { case: { $lt: ['$userData.age', 18] }, then: 'Under 18' },
                { case: { $and: [{ $gte: ['$userData.age', 18] }, { $lt: ['$userData.age', 25] }] }, then: '18-24' },
                { case: { $and: [{ $gte: ['$userData.age', 25] }, { $lt: ['$userData.age', 35] }] }, then: '25-34' },
                { case: { $and: [{ $gte: ['$userData.age', 35] }, { $lt: ['$userData.age', 45] }] }, then: '35-44' },
                { case: { $and: [{ $gte: ['$userData.age', 45] }, { $lt: ['$userData.age', 55] }] }, then: '45-54' },
                { case: { $and: [{ $gte: ['$userData.age', 55] }, { $lt: ['$userData.age', 65] }] }, then: '55-64' },
                { case: { $gte: ['$userData.age', 65] }, then: '65+' }
              ],
              default: 'Unknown'
            }
          }
        }
      },
      {
        $group: {
          _id: '$ageGroup',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1
        }
      }
    ]);
    
    const allAgeGroups = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
    
    const result = allAgeGroups.map(group => {
      const found = ageDistribution.find(item => item.name === group);
      return {
        name: group,
        count: found ? found.count : 0
      };
    });
    
    res.status(200).json({
      success: true,
      data: result,
      total: result.reduce((sum, item) => sum + item.count, 0)
    });
    
  } catch (error) {
    console.error('Error getting age distribution:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get age distribution',
      error: error.message
    });
  }
};