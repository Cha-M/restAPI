const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

// Create two middleware functions that deal with
// password hashing.
// • Use the BcryptJS npm package.


// • One middleware should hash the password
// before it is stored in the DB on user creation.
exports.hashPassword = async (req, res, next) => {
    try {
        // const pass = req.body.pass;
        req.body.password = await bcrypt.hash(req.body.password, 8);
        // req.body.pass = hashedPass;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};

// • The second middleware should decrypt the
// hashed password to compare against the
// original password on a login route.
exports.decryptPassword = async (req, res, next) => {
    try {
        // const password = req.body.password;
        req.user = await User.findOne({ username: req.body.username });
        if (await bcrypt.compare(eq.body.password, req.user.password)) {
            next();
        }
        else {
            throw new Error("Incorrect credentials");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message })
    }
};

exports.checkToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedToken._id);
        if (req.user) {
            next();
        } else {
            throw new Error("No user found");
        }
        // console.log(user);
        // next();

    } catch (error) {
        console.log(error);
        res.status(500).send({err: error.message});
    }
};