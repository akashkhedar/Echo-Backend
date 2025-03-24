const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("MongoDB Connected!"))
    .catch((err) => console.error(err));
};

module.exports = connectToMongo;
