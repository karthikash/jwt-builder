const { JwtService } = require("../services");

const fnSignJwtToken = (req, res) => {
  try {
    const jwt = new JwtService(req.body);
    const token = jwt.sign();
    return res.status(200).json({ status: 200, token });
  } catch (error) {
    logger.error(error);
    return res
      .status(401)
      .json({ status: 401, name: error.name, message: error.message });
  }
};

const fnVerifyJwtToken = (req, res) => {
  try {
    const jwt = new JwtService(req.body);
    const decoded = jwt.verify();
    return res.status(200).json({ status: 200, decoded });
  } catch (error) {
    logger.error(error);
    return res
      .status(401)
      .json({ status: 401, name: error.name, message: error.message });
  }
};

module.exports = {
  fnSignJwtToken,
  fnVerifyJwtToken,
};
