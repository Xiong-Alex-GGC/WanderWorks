// app.js
import express from 'express';
import cors from 'cors';
import itineraryRoutes from './routes/itineraryRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});

// Use the itinerary routes
app.use('/api', itineraryRoutes);
app.use('/api', activityRoutes);
app.use('/api', userRoutes);


app.listen(4000, () => console.log("Up & Running on port 4000"));
