const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/restaurant_board", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    const db =mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
};

module.exports = connect;