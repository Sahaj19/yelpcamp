const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(db async setup)
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp");
    console.log("yelpcamp connected successfully!");
  } catch (error) {
    console.log(error);
    console.log("yelpcamp failed to connect");
  }
}

main();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routing prerequisites)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routing)
app.get("/", (req, res) => {
  res.render("campgrounds/home.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port:3000)
app.listen(3000, () => {
  console.log("server is active on port : 3000");
});

//(initial check)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// app.get("/newcampground", async (req, res) => {
//   let campground = new Campground({
//     title: "my campground",
//     price: "1000",
//     description: "wow , it's amazing place to stay",
//     location: "delhi,india",
//   });

//   await campground.save();
//   res.send("success");
// });
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
