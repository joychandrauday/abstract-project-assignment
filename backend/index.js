const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const port = process.env.PORT || 8000;

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://abstract-help.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsswhi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const cardsCollection = client.db("cardCenter").collection("cards");
    const requestCollection = client.db("cardCenter").collection("requests");
    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // 1. Create a Card
    app.post("/cards", async (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "Title and description are required" });
      }

      const card = {
        title,
        description,
      };

      try {
        const result = await cardsCollection.insertOne(card);
        res.status(201).json(result); // Return the created card
      } catch (error) {
        res.status(500).json({ error: "Could not create the card" });
      }
    });

    // 2. Get All Cards with Search Functionality
    app.get("/cards", async (req, res) => {
      const { searchQuery } = req.query;

      const query = {};

      if (searchQuery) {
        // Search in both title and description fields
        query.$or = [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ];
      }

      try {
        const cards = await cardsCollection.find(query).toArray();
        if (cards.length === 0) {
          return res.json({ cards: "No cards found" });
        }
        res.status(200).json(cards);
      } catch (error) {
        res.status(500).json({ error: "Could not fetch the cards" });
      }
    });

    // 3. Get a Specific Card by Title
    app.get("/cards/:title", async (req, res) => {
      const title = req.params.title;

      try {
        const card = await cardsCollection.findOne({ title });
        if (!card) {
          return res.status(404).json({ error: "Card not found" });
        }
        res.status(200).json(card);
      } catch (error) {
        res.status(500).json({ error: "Could not fetch the card" });
      }
    });
    //4. DELETE api /cards/:id
    app.delete("/cards/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) }; // Use ObjectId to match the ID format in MongoDB

        const result = await cardsCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Card not found" });
        }

        res.status(200).json({ message: "Card deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });
    // 5.GET request handler
    app.get("/requests", async (req, res) => {
      const { email } = req.query;

      // Define the query object
      const query = {};

      // If an email is provided, add it to the query
      if (email) {
        query.email = email;
      }

      try {
        // Fetch requests from the database, optionally filtered by email
        const requests = await requestCollection.find(query).toArray();
        res.json(requests);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // 6.POST request handler
    app.post("/requests", async (req, res) => {
      const { requestType, description, email } = req.body;

      if (!requestType || !description) {
        return res
          .status(400)
          .json({ message: "Request Type and Description are required" });
      }

      try {
        const newRequest = {
          requestType,
          description,
          email,
          status: "pending",
          updatedAt: new Date(),
          createdAt: new Date(),
          createdAt: new Date(),
        };

        const result = await requestCollection.insertOne(newRequest);

        // Return the newly created request along with its ID
        res.status(201).json({
          success: true,
          request: {
            _id: result.insertedId,
            ...newRequest,
          },
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    // solving request and updating 
    app.patch("/requests/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { status, updatedAt } = req.body;
        
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ID" });
        }

        const query = { _id: new ObjectId(id) };
        const update = {
          $set: { status, updatedAt },
        };
        const result = await requestCollection.updateOne(query, update);
        console.log(result);
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Request not found" });
        }

        const updatedRequest = await cardsCollection.findOne(query);
        res.status(200).json(updatedRequest);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });
    // Error Handling for Non-Existent Routes
    app.use((req, res) => {
      res.status(404).json({ api: "No Route found in this URL." });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/ping", (req, res) => {
  res.send("Hello from Abstract Help Center Server..");
});

app.listen(port, () => {
  console.log(`Abstract Help Center is running on port ${port}`);
});
