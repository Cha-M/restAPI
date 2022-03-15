require("./db/connection");
const express = require("express");
const cors = require("cors");
const movieRouter = require("./movie/movieRoutes");
const userRouter = require("./user/userRoutes");
const app = express();
const port = 5001;

//position is important here, above routers
app.use(express.json());
app.use(cors());

app.use(movieRouter);
app.use(userRouter);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}
)