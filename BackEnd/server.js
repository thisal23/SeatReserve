import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
// Middleware
app.use(express.json())
app.use(cors())

// API Routes
app.get('/', (req, res) => { res.send('Server is Live')})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})
