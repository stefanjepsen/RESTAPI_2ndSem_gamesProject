const router = require("express").Router();
const game = require("../models/game");

// CRUD operations


// /api/games/
//Create game -> post

router.post("/", (req, res) => {

    data = req.body;

    game.insertMany(data)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
});

// Read all games -> get
router.get("/", (req, res) => {
    game.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
});


// Read all games which is recommended ->
router.get("/recommended", (req, res) => {
    game.find({
            recommended: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
});


//  Read specific game -> get
router.get("/:id", (req, res) => {
    game.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
});


// Update specific game -> put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    game.findByIdAndUpdate(id, req.body)
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: " Cannot update game with id=" + id + ".Maybe game was not found!"
                })
            } else {
                res.send({  message: " Game was succesfully updated"  })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating game with id=" + id
            });
        })
});

// Delete specific game -> Delete

router.delete("/:id", (req, res) => {

    const id = req.params.id;

    game.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: " Cannot delete game with id=" + id + ".Maybe game was not found!"
                })
            } else {
                res.send({  message: " Game was succesfully deleted"  })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error delete game with id=" + id
            });
        })
});

module.exports = router;