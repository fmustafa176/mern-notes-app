const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRoute = require('./routes/note');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/notes', notesRoute);

//mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Server Up');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})