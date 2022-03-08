const bcrypt = require("bcryptjs");
const User = require("../user/userModel");

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