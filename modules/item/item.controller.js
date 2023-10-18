const Item = require("./item.model");

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const result = await newItem.save();
    res.status(200).json({
      status: true,
      message: "Item Add successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Item Add unsuccessful",
      errorMessage: error.message,
    });
  }
};

const getItemsByParentMenu = async (req, res) => {
  try {
    const result = await Item.find({ parent_menu: req.params.parentMenuId })
      .sort({ _id: -1 })
      .populate("parent_menu");
    res.status(200).json({
      status: true,
      message: "Items get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Items get unsuccessful",
    });
  }
};

const getItemsBySubMenu = async (req, res) => {
  try {
    const result = await Item.find({ sub_menu: req.params.subMenuId })
      .sort({ _id: -1 })
      .populate("sub_menu");
    res.status(200).json({
      status: true,
      message: "Items get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Items get unsuccessful",
    });
  }
};

const getItemsByUserId = async (req, res) => {
  try {
    const result = await Item.find({ user: req.params.userId })
      .sort({ _id: -1 })
      .populate("user")
      .populate("parent_menu");
    res.status(200).json({
      status: true,
      message: "Items get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Items get unsuccessful",
    });
  }
};

const getItemById = async (req, res) => {
  try {
    const result = await Item.findById({ _id: req.params.id })
      .populate("user")
      .populate("parent_menu");
    res.status(200).json({
      status: true,
      message: "Item get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Item get unsuccessful",
    });
  }
};

const getItems = async (req, res) => {
  try {
    const result = await Item.find({})
      .sort({ _id: -1 })
      .populate("user")
      .populate("parent_menu");
    res.status(200).json({
      status: true,
      message: "Items get successfully",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Items get unsuccessful",
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const isExist = await Item.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Item.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Item Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Item update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Item update unsuccessful",
    });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const isExist = await Item.findOne({ _id: req.params.id });
    if (isExist) {
      const result = await Item.findByIdAndDelete(
        { _id: req.params.id },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: true,
        message: "Item Delete successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        status: true,
        message: "Item Delete unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Item Delete unsuccessful",
    });
  }
};

module.exports = {
  createItem,
  getItemsByParentMenu,
  getItemsBySubMenu,
  getItemsByUserId,
  getItemById,
  getItems,
  updateItem,
  deleteItemById,
};
