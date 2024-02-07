import express from 'express';
import cors from 'cors';
import { addDoc, collection, getDocs, updateDoc, doc, getDoc} from 'firebase/firestore';
import db from './firebaseConfig.js';

const app = express();
app.use(express.json());
app.use(cors());

const itinCollection = collection(db, 'Itinerary');
const snapshot = await getDocs(itinCollection);


//deafult
app.get("/", async (req, res) => {
    res.send("Welcome to the server!");
});

//get all Itin
app.get("/itineraries", async (req, res) => {
    const list = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data() 
    }));

    res.send(list);
});

//create new Itin
app.post("/create", async (req, res) => {
    const data = req.body;
    console.log("Data of Itinerary ", data);

    //Send Data
    await addDoc(collection(db, 'Itinerary'), data);
    res.send({ msg: "Itinerary Added" });
})

//update Itin
app.post("/update", async (req, res) => {
    const id = req.body.id;
    const data = req.body;

    // Use updateDoc to update the document
    await updateDoc(doc(itinCollection, id), data);
    res.send({ msg: "Itinerary Updated" });
});

//
// Route to get a specific Itinerary by ID
app.get("/itinerary/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const docSnapshot = await getDoc(doc(itinCollection, id));

        if (docSnapshot.exists()) {
            const itineraryData = { id: docSnapshot.id, ...docSnapshot.data() };
            res.json(itineraryData);
        } else {
            res.status(404).json({ error: 'Itinerary not found' });
        }
    } catch (error) {
        console.error('Error fetching specific Itinerary data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000, () => console.log("Up & Running on port 4000"));
