
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bookingRoutes = require('./routes/bookingroutes');
const authcontroller = require('./controllers/authcontroller')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/bookings', bookingRoutes);
app.post('/api/signup', authcontroller.signup);

app.post('/api/signin',authcontroller.signin);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
