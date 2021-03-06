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
app.listen(() => console.log('Server Started correctly'))


// Handle CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});



mongoose.connect(
    process.env.DBHOST, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MOngoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succefully to MongoDB"));

//Routes
app.get("/api/welcome", (req, res) => {

    res.status(200).send({
        message: "Welcome To the api"
    });

});


// CRUD

app.use("/api/games", gameRoutes); //Crud Routes
app.use("/api/user", authRoutes); //Auth routes (register, login)

// /api/user/login ->post

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;