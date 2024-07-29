const mongoose = require("mongoose");

const USER = "giovanicerejobrasil";
const PASS = "LpsIUU9wxN8Wax1L";

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      `mongodb+srv://${USER}:${PASS}@cluster0.5mc0kn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("SUCCESS: CONNECTED TO DB");
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

module.exports = main;
