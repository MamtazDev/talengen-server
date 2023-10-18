const Setting = require("./setting.model");

const createInitialSetting = async (data) => {
  const result = await Setting.create(data);
  return result;
};

module.exports = {
  createInitialSetting,
};
