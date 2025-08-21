export const withdrawWalletBalance = async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    res.status(201).json({
      data: "",
      success: true,
      message: "you deposit 400$ USD to you account success!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong !!",
      success: false,
      message: error.message,
    });
  }
};

export const depositWalletBalance = async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    res.status(201).json({
      data: "",
      success: true,
      message: "you deposit 400$ USD to you account success!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong !!",
      success: false,
      message: error.message,
    });
  }
};
export const getWalletTransactions = async (req, res) => {
  try {
    const payload = req.body;

    console.log(payload);

    res.status(201).json({
      data: "",
      success: true,
      message: "you deposit 400$ USD to you account success!",
    });
  } catch (error) {
    res.status(500).json({
      data: "[Error]: something went wrong !!",
      success: false,
      message: error.message,
    });
  }
};
