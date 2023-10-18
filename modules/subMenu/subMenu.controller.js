const SubMenu = require("./subMenu.model");

const createSubMenu = async (req, res) => {
  try {
    const newSubMenu = new SubMenu(req.body);
    const result = await newSubMenu.save();
    res.status(200).json({
      status: true,
      message: "Sub Menu Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu Add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const createSubMenus = async (req, res) => {
  try {
    const subMenus = req.body;
    const createdSubMenus = await SubMenu.create(subMenus);
    res.status(200).json({
      status: true,
      message: "Sub Menus added successfully",
      data: createdSubMenus,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menus add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getSubMenusByParentMenu = async (req, res) => {
  try {
    const result = await SubMenu.find({ parent_menu: req.params.parentMenuId });
    res.status(200).json({
      status: true,
      message: "Sub Menu get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu get unsuccessful",
    });
  }
};

const getSubMenuById = async (req, res) => {
  try {
    const result = await SubMenu.findById({ _id: req.params.id });
    res.status(200).json({
      status: true,
      message: "Sub Menu get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu get unsuccessful",
    });
  }
};

const getSubMenus = async (req, res) => {
  try {
    const result = await SubMenu.find({});
    res.status(200).json({
      status: true,
      message: "Sub Menu get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu get unsuccessful",
    });
  }
};

const updateSubMenu = async (req, res) => {
  try {
    const isExist = await SubMenu.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await SubMenu.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Sub Menu Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Sub Menu update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu update unsuccessful",
    });
  }
};

const deleteSubMenuById = async (req, res) => {
  try {
    const isExist = await SubMenu.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await SubMenu.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Sub Menu Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Sub Menu Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Sub Menu Delete unsuccessful",
    });
  }
};

module.exports = {
  createSubMenu,
  createSubMenus,
  getSubMenusByParentMenu,
  getSubMenuById,
  getSubMenus,
  updateSubMenu,
  deleteSubMenuById,
};
