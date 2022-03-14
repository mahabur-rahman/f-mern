const express = require("express");
const app = express();
// .env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.port || 4000;
require("./db/conn");

// middleware
app.use(express.json());
app.use(require("./routes/auth"));

// 404, not found page
app.get("/*", (req, res) => {
  res.status(404).json({
    name: false,
    message: "Page not found !",
  });
});

// listen app
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
