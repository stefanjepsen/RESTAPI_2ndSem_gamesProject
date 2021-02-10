const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let gameSchema = new Schema(
    {
        name: {type: String},
        publisher: {type: String},
        genre: {type: String},
        details: {type: String},
        releaseYear: {type: Number},
        recommended: {type: Boolean}
    }
);

module.exports = mongoose.model("game", gameSchema);