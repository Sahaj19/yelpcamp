const mongoose = require("mongoose");
const { Schema } = mongoose;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const campgroundSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Campground = mongoose.model("Campground", campgroundSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = Campground;
