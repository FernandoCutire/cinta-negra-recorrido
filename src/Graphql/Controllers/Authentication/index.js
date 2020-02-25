const jwt = require("jsonwebtoken");

Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const createToken = userData => {
  const expDate = new Date().addDays(1).getTime();
  const payload = {
    _id: userData._id,
    userName: userData.name,
    userEmail: userData.email,
    exp: expDate
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = {
    createToken
}