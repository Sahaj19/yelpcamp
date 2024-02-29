const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Campground = require("./models/campground.js");
const ExpressError = require("./utils/expressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

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
app.engine("ejs", ejsMate);
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
app.get(
  "/campgrounds",
  wrapAsync(async (req, res) => {
    let allCampgrounds = await Campground.find();
    res.render("campgrounds/index.ejs", { allCampgrounds });
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new page)
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

//(post route)
app.post(
  "/campgrounds",
  wrapAsync(async (req, res) => {
    let campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect("/campgrounds");
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show page)
app.get(
  "/campgrounds/:id",
  wrapAsync(async (req, res, next) => {
    try {
      let { id } = req.params;

      let campground = await Campground.findById(id);

      if (!campground) {
        return next(new ExpressError(400, "Campground don't exist!"));
      }

      res.render("campgrounds/show.ejs", { campground });
    } catch (err) {
      next(err);
    }
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit page)
app.get(
  "/campgrounds/:id/edit",
  wrapAsync(async (req, res, next) => {
    try {
      let { id } = req.params;

      let campground = await Campground.findById(id);

      if (!campground) {
        return next(new ExpressError(400, "Campground don't exist!"));
      }

      res.render("campgrounds/edit.ejs", { campground });
    } catch (error) {
      next(error);
    }
  })
);

//(update route)
app.put(
  "/campgrounds/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${id}`);
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete(
  "/campgrounds/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page not found!"));
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.CastError) {
    return next(new ExpressError(400, "Campground Don't exist!"));
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  let { status = 400, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port:3000)
app.listen(3000, () => {
  console.log("server is active on port : 3000");
});
