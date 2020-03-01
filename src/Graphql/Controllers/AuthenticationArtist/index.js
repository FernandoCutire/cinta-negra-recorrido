const jwt = require("jsonwebtoken");

Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const createToken = artistData => {
  const expDate = new Date().addDays(1).getTime();
  const payload = {
    _id: artistData._id,
    userName: artistData.name,
    userEmail: artistData.email,
    exp: expDate
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = {
  createToken
};
