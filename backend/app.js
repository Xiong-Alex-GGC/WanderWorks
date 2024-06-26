// app.js
import express from 'express';
import cors from 'cors';
import itineraryRoutes from './routes/itineraryRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import transportationRoutes from './routes/transportationRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';



const app = express();
app.use(express.json());


// Allow requests from multiple origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://wanderworks-itinerary.web.app/'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the server!");
});

// Use the itinerary routes
app.use('/api', itineraryRoutes);
app.use('/api', activityRoutes);
app.use('/api', userRoutes);
app.use('/api', transportationRoutes);
app.use('/api', accommodationRoutes);
app.use('/api', expenseRoutes);
//Checks if server is online localhost:4000
app.listen(4000, () => console.log("Up & Running on port 4000"));
