const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers.js");
const cities = require("./cities.js");
const Campground = require("../models/campground.js");

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
//(let's initialize our db with some data)

const initializeDb = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i <= 50; i++) {
    let random1000 = Math.floor(Math.random() * 1000);
    let randomArrayIndex = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
    const campground = new Campground({
      title: `${randomArrayIndex(places)}, ${randomArrayIndex(descriptors)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });

    await campground.save();
  }
};

initializeDb().then(() => {
  console.log("campgrounds info inserted successfully!");
  mongoose.connection.close();
});
