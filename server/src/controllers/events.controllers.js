const createEvent = async((req, res) => {
  try {
    const payload = req.body;

    res.status(201).json(formatResponse("", true, "a new event was created!"));
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse("[Error]: something went wrong!!", false, error.message)
      );
  }
});
const updateEvent = async((req, res) => {
  try {
    const payload = req.body;

    res.status(201).json(formatResponse("", true, "a new event was created!"));
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse("[Error]: something went wrong!!", false, error.message)
      );
  }
});
const deleteEvent = async((req, res) => {
  try {
    const payload = req.body;
    const eventId = req.params;

    res.status(201).json(formatResponse("", true, "a new event was created!"));
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse("[Error]: something went wrong!!", false, error.message)
      );
  }
});
