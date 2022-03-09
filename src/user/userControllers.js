const jwt = require("jsonwebtoken");
const User = require("./userModel");

//Submission is CRUD


exports.addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
        res.status(200).send({ user: newUser.username, token });

    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
        
    }
}

exports.login = async (req, res) => {
    try {
        res.status(200).send({ user: req.user.username });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}