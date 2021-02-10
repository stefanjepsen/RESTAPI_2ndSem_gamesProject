const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

require("dotenv-flow").config();

// Prints message when server starts
app.listen(() => console.log('It has begun..'))

//Routes
app.get("/api/welcome", (req, res) => {
    
    res.status(200).send({message: "This is an API Call !"});
    

});



mongoose.connect
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MOngoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succefully to MongoDB"));


const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT) ;
})

module.exports = app;
