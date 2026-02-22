import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import manageRoute from './routes/manageRoutes.js';
import trainListRoutes from './routes/trainlistRoutes.js';
import searchRoutes from './routes/serchRoutes.js';
import fareRoutes from './routes/fareRoutes.js';
import "./cron/refreshRemainingSeats.js";
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
// Middleware
app.use(express.json());
app.use(cors())

// API Routes
app.get('/api', (req, res) => { res.send('Server is Live')})
app.use('/api/auth', authRoutes);
app.use('/api/manage', manageRoute );
app.use('/api', trainListRoutes);
app.use('/api/search',searchRoutes);
app.use('/api', fareRoutes);
app.use('/api/booking',bookingRoutes);

// Start the server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
