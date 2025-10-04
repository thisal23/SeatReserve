import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import authRoutes from './routes/authRoutes.js';
import manageRoute from './routes/manageRoutes.js';
import trainListRoutes from './routes/trainlistRoutes.js';
import searchRoutes from './routes/serchRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
// Middleware
app.use(express.json())
app.use(cors())

// API Routes
app.get('/', (req, res) => { res.send('Server is Live')})
app.use('/auth', authRoutes);
app.use('/manage', manageRoute );
app.use('/', trainListRoutes);
app.use('/search',searchRoutes);

// Start the server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
