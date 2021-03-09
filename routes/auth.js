const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {registerValidation, loginValidation} = require('../valdation');



// /registration
router.post("/register", async (req, res) => {
    //Code

    //Validate user input (name, email, password)
    const {  error  } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({  error: error.details[0].message  });
    }


    //Check if the email is already registered
    const  emailExist = await User.findOne({  email: req.body.email  });

    if (emailExist) {
        return res.status(400).json({ error: "Email findes allerede!"})
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create a user object and save in the DB
    const userObject = new User ({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser._id  });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// /login
router.post("/login", async (req, res) => {

    // Validate user lgoin info
    const {  error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({  error: error.details[0].message  });
    }

    //if login info is valid, find the user
    const  user = await User.findOne({  email: req.body.email  });


    //threw error if email is wrong (user does not exist in DB)
    if (!user) {
        return res.status(400).json({ error: "Email er forkert, eller den eksisterer ikke i databasen."})
    }

    //User exists - check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    //thrwo error if password is wrong
    if (!validPassword) {
        return res.status(400).json({  error: "Password er forkert i forhold til db."});
    }

    //Create authentication toke nwith username and id
    const token = jwt.sign
    (
        //payload
        {
            name: user.name,
            id: user._id
        },
        //Token_secret
        process.env.TOKEN_SECRET,
        {  expiresIn: process.env.JWT_EXPIRES_IN  },
        //Expiration time for the token to be valid.
    );

    //attach auth token to header
    res.header("auth-token", token).json({
        error: null,
        data: {  token  }
    });

//  return res.status(200).json({  msg: "Login Route route..."});
  
});

module.exports = router;