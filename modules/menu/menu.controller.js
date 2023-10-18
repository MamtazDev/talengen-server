const Menu = require("./menu.model");

const createMenu = async (req, res) => {
  try {
    const newMenu = new Menu(req.body);
    const result = await newMenu.save();
    res.status(200).json({
      status: true,
      message: "Menu Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu Add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getMenusByUser = async (req, res) => {
  try {
    const result = await Menu.find({ user: req.params.userId });
    res.status(200).json({
      status: true,
      message: "Menu get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu get unsuccessful",
    });
  }
};

const getMenuById = async (req, res) => {
  try {
    const result = await Menu.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Menu get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu get unsuccessful",
    });
  }
};

const getMenus = async (req, res) => {
  try {
    const result = await Menu.find({});
    res.status(200).json({
      status: true,
      message: "Menus get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu get unsuccessful",
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const isExist = await Menu.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Menu.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Menu Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Menu update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu update unsuccessful",
    });
  }
};

const deleteMenuById = async (req, res) => {
  try {
    const isExist = await Menu.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Menu.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Menu Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Menu Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Menu Delete unsuccessful",
    });
  }
};

module.exports = {
  createMenu,
  getMenusByUser,
  getMenuById,
  getMenus,
  updateMenu,
  deleteMenuById,
};
