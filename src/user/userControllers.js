const jwt = require("jsonwebtoken");
const User = require("./userModel");

//Submission is CRUD

// //Create
// exports.addMovie = async (req, res) => {
//     try {
//         const newMovie = await Movie.create(req.body);
//         res.status(200).send({ movie: newMovie });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ err: error.message });
//     }
// }

// //Update
// exports.updateMovie = async (req, res) => {
//     try {
//         const updatedMovie = await Movie.updateOne(
//             {[req.body.filterKey]: req.body.filterVal},
//             {[req.body.updateKey]: req.body.updateVal},
            
//         );
//         if (updatedMovie.modifiedCount > 0) {
//             res.status(200).send({ movie: updatedMovie });
//         }
//         else {
//             throw new Error("Did not update.");
//         }


//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ err: error.message });
//     }
// }

// //Delete
// exports.deleteMovie = async (req, res) => {
//     try {
//         const deleteMovie = await Movie.deleteOne( {[req.params.deleteKey]: req.body.deleteVal} );
//         if (deleteMovie.modifiedCount > 0) {
//             res.status(200).send({ movie: deleteMovie });
//         }
//         else {
//             throw new Error("Did not delete.");
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ err: error.message });
//     }
// }


// //List/Read
// exports.listMovies = async (req, res) => {
//     try {
//         const movies = await Movie.find({});
//         res.status(200).send({ allMovie: movies });
//     } catch (error) {
//         console.log(error);
//     }
// }



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

exports.updatePassword = async (req, res) => {
    try {
        // req.user
        // req.body.password
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