const express = require('express');
const app = express();

// Routes
const profesor = require('./routes/profesor');

// Middleware
const index = require('./middleware/index');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);

app.use('/p', profesor);

app.use(notFound);

app.listen(process.env.PORT || 5555, () => {
    console.log('Server is running...');
});