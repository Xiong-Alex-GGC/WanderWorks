import express from 'express';
import cors from 'cors';
import { addDoc, collection } from 'firebase/firestore';
import db from './firebaseConfig.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});

app.post("/create", async (req, res) => {
    const data = req.body;

    try {
        // Use the Firestore instance to interact with the database
        const result = await addDoc(collection(db, 'Itinerary'), data);
        console.log("Document added with ID: ", result.id);
        res.send({ msg: "Itinerary Added" });
    } catch (error) {
        console.error("Error adding document: ", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.listen(4000, () => console.log("Up & Running on port 4000"));
