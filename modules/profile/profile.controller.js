const Profile = require("./profile.model");

const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const result = await newProfile.save();
    res.status(200).json({
      status: true,
      message: "Profile Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profile Add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getProfileByUser = async (req, res) => {
  try {
    const result = await Profile.findOne({ user: req.params.userId }).populate(
      "user"
    );
    res.status(200).json({
      status: true,
      message: "Profile get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profile get unsuccessful",
    });
  }
};

const getProfileById = async (req, res) => {
  try {
    const result = await Profile.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Profile get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profile get unsuccessful",
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const result = await Profile.find({});
    res.status(200).json({
      status: true,
      message: "Profiles get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profiles get unsuccessful",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const isExist = await Profile.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Profile.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Profile Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Profile update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profile update unsuccessful",
    });
  }
};

const deleteProfileById = async (req, res) => {
  try {
    const isExist = await Profile.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Profile.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Profile Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Profile Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Profile Delete unsuccessful",
    });
  }
};

module.exports = {
  createProfile,
  getProfileByUser,
  getProfileById,
  getProfiles,
  updateProfile,
  deleteProfileById,
};
