import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ads from "./models/ads.js";
import { MongoClient } from "mongodb";
//import { c1 } from "./data/dummyData.js"; // Dummy Data

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Search route
app.get("/search", async (req, res) => {
    const searchTerm = req.query.term.toLowerCase();
    if (searchTerm === "") {
      res.json([]);
    } else {
    try {
      const client = new MongoClient(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
      const database = client.db("test");
      const collection = database.collection("companies");
      const matchingAds = await collection
        .find({
          $or: [
            { company: { $regex: `.*${searchTerm}.*`, $options: "i" } },
            { headline: { $regex: `.*${searchTerm}.*`, $options: "i" } },
            { description: { $regex: `.*${searchTerm}.*`, $options: "i" } },
            { primaryText: { $regex: `.*${searchTerm}.*`, $options: "i" } },
          ],
        })
        .toArray();
      await client.close();

      res.json(matchingAds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Serve static files
app.use(express.static("public"));

// START THE SERVER
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // ads.insertMany(c1); // INSERTING DATA MANUALLY
  });
