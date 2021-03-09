const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

//setup swagger 
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//Import routes
const gameRoutes = require("./routes/game");
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

// parse requests of content-type J-Sons
app.use(bodyParser.json());

// Prints message when server starts
app.listen(() => console.log('It has begun..'))




mongoose.connect
(
    process.env.DBHOST,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MOngoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succefully to MongoDB"));

//Routes
app.get("/api/welcome", (req, res) => {
    
    res.status(200).send({message: "This is an API Call !"});
    
});


// CRUD

app.use("/api/games", gameRoutes);
app.use("/api/user", authRoutes);

// /api/user/login ->post

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT) ;
})

module.exports = app;
