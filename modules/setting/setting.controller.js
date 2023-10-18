const Setting = require("./setting.model");

const createSetting = async (req, res) => {
  try {
    const newSetting = new Setting(req.body);
    const result = await newSetting.save();
    res.status(200).json({
      status: true,
      message: "Setting Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Setting Add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getSettingByUser = async (req, res) => {
  try {
    const result = await Setting.findOne({ user: req.params.userId }).populate(
      "user"
    );
    res.status(200).json({
      status: true,
      message: "Setting get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Setting get unsuccessful",
    });
  }
};

const getSettingById = async (req, res) => {
  try {
    const result = await Setting.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Setting get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Setting get unsuccessful",
    });
  }
};

const getSettings = async (req, res) => {
  try {
    const result = await Setting.find({});
    res.status(200).json({
      status: true,
      message: "Settings get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Settings get unsuccessful",
    });
  }
};

const updateSetting = async (req, res) => {
  try {
    const isExist = await Setting.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Setting.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Setting Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Setting update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Setting update unsuccessful",
    });
  }
};

const deleteSettingById = async (req, res) => {
  try {
    const isExist = await Setting.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Setting.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Setting Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Setting Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Setting Delete unsuccessful",
    });
  }
};

module.exports = {
  createSetting,
  getSettingByUser,
  getSettingById,
  getSettings,
  updateSetting,
  deleteSettingById,
};
