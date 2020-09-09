const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const ActivateRoutes = require("./routes/index");

const app = express();

(async () => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.static("static"));
    const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
    const port = process.env.NODE_ENV === "development" ? 3000 : 3001;

    ActivateRoutes(app);

    const server = app.listen(port, () =>
      console.log(`Backend is running on ${port}`)
    );
  } catch (err) {
    console.log(err);
  }
})();

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
});
