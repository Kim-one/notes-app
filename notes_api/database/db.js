const mongoose = require('mongoose');
require("dotenv").config();
const connectString = process.env.CONNECTIONSTRING;
// console.log(connectString);
const db = mongoose.connect(connectString).then(() => console.log("Connected Successfully")).catch((err) => console.log(err));

module.exports = db;