const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ratelimits = new Schema({
    _id: String,
    discriminator: String,
    count: Number,
    next_reset: Number
}, {
  _id: false,
  versionKey: false
});

module.exports = mongoose.model("Ratelimits", ratelimits, "ratelimits");