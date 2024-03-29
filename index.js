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
const authenticate = require('./middlewire/authenticate');
const Data = require('./models/data');
const User = require('./models/user');

// Define routes
const dataRouter = require('./routes/data');
const authRouter = require('./routes/auth'); 
const userRouter = require('./routes/users'); 
app.use('/data', authenticate, dataRouter); 
app.use('/auth', authRouter); 
app.use('/users', authenticate, userRouter); 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
