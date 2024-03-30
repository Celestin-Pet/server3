const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.use(cors());
app.use(express.json());
const { authenticate } = require('./middlewire/authenticate'); 

// Import routes
const jobPostRouter = require('./routes/jobPost');
const candidateRouter = require('./routes/candidate');

app.use('/job-posts',  jobPostRouter);
app.use('/candidates',  candidateRouter);

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
