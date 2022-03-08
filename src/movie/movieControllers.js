const Movie = require("./movieModel");

//Create
exports.addMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(200).send({ movie: newMovie });

    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}

//Update
exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.updateOne(
            {[req.body.filterKey]: req.body.filterVal},
            {[req.body.updateKey]: req.body.updateVal},
            
        );
        if (updatedMovie.modifiedCount > 0) {
            res.status(200).send({ movie: updatedMovie });
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
exports.deleteMovie = async (req, res) => {
    try {
        const deleteMovie = await Movie.deleteOne( {[req.params.deleteKey]: req.body.deleteVal} );
        if (deleteMovie.modifiedCount > 0) {
            res.status(200).send({ movie: deleteMovie });
        }
        else {
            throw new Error("Did not delete.");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ err: error.message });
    }
}


//List/Read
exports.listMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send({ allMovie: movies });
    } catch (error) {
        console.log(error);
    }
}

