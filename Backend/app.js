const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./models");
const userRoutes = require("./routes/userRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = 3001;

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();

    console.log("Database connected...");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});