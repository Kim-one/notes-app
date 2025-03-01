//imports and const
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const db = require('./database/db');
const controller = require('./controller/controller');
// const router = express.Router();

//create node js server
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/notes", controller);

app.listen(port, (err) => {
    // console.log("Error Occured: ", err);
    console.log(`Server running on port: ${port}`);
});

