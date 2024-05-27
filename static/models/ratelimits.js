const { Model } = require("mongoose");

module.exports = new Model({
    _id: String,
    discriminator: String,
    count: Number,
    next_reset: Number
}, {
  _id: false,
  versionKey: false
});
