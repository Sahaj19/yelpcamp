const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
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
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Home page)
app.get("/", (req, res) => {
  res.render("campgrounds/home.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index page)
app.get("/campgrounds", async (req, res) => {
  let allCampgrounds = await Campground.find();
  res.render("campgrounds/index.ejs", { allCampgrounds });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new page)
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

//(post route)
app.post("/campgrounds", async (req, res) => {
  let campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect("/campgrounds");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show page)
app.get("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/show.ejs", { campground });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit page)
app.get("/campgrounds/:id/edit", async (req, res) => {
  let { id } = req.params;
  let campground = await Campground.findById(id);
  res.render("campgrounds/edit.ejs", { campground });
});

//(update route)
app.put("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  res.redirect(`/campgrounds/${id}`);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete("/campgrounds/:id", async (req, res) => {
  let { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port:3000)
app.listen(3000, () => {
  console.log("server is active on port : 3000");
});
