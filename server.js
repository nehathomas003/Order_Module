const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const DataModel = require("./DataModel")
const connectDB = require("./Database");
connectDB();

const app = express();
app.use(express.json({ extended: false }));

//we need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
app.use(cors());

app.get("/readfromserver", async (req, res) => {
    try {
      const data = await DataModel.find(); // Retrieve all data from the DataModel collection
      res.json(data); // Send retrieved data as a response
    } catch (error) {
      console.log("Server error while fetching data:", error.message);
      res.status(500).send("Server error while fetching data");
    }
  });
app.post("/writetodatabase", async (req, res) => {
  try {
    const {content} = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
})

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
})