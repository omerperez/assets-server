import express from "express";
const app = express();
const port = 3005; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  // console.log("omer")
  console.log(`server started at http://localhost:${port}`);
});
