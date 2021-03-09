const Joi = require('joi');
const jwt = require('jsonwebtoken');



//validating registration
const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(8).max(255).required(),
        });

        return schema.validate(data);
}
//valdating login
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(8).max(255).required(),
        });

        return schema.validate(data);
}


// login to verify our token (JWT)
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if(!token) return res.status(401).json({error: "Access Denied because no tokens is used or correct one"});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        res.status(400).json({error: "token is not valid"});
    }
}



module.exports = { registerValidation, loginValidation, verifyToken };