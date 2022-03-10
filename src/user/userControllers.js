const jwt = require("jsonwebtoken");
const User = require("./userModel");

//Submission is CRUD

//List/Read
exports.listUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ allUser: users });

        } catch (error) {
            console.log(error);
    }
}

//Create
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

//Update
exports.updatePassword = async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { username: req.user.username },
            { password: req.body.password }
            
        );
        if (updatedUser.modifiedCount > 0) {
            res.status(200).send({ msg: "Successfully updated user." });
        }
        else {
            throw new Error("Did not update.");
        }            
            
        } catch (error) {
            console.log(error);
            res.status(500).send({ err: error.message });
        }
}

//Delete
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ [req.params.filterKey]: req.body.filterVal });
            
        // const token = await jwt.sign({ _id: deletedUser._id }, process.env.SECRET);
        // res.status(200).send({ user: deletedUser.username, token });

        if (deletedUser.deletedCount > 0) {
            res.status(200).send({ msg: "Successfully deleted user." });
        }
        else {
            throw new Error("Did not delete.");
        }
            
        } catch (error) {
            console.log(error);
            res.status(500).send({ err: error.message });
    }
};
    
    
exports.login = async (req, res) => {
    try {
        res.status(200).send({ user: req.user.username });
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
};
