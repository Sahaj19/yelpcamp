const mongoose = require("mongoose");
const { Schema } = mongoose;

let imgLink = `https://images.unsplash.com/photo-1682695794947-17061dc284dd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const campgroundSchema = new Schema({
  title: String,
  price: Number,
  image: {
    type: String,
    default: imgLink,
    set: (v) => (v === "" ? imgLink : v),
  },
  description: String,
  location: String,
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Campground = mongoose.model("Campground", campgroundSchema);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = Campground;
