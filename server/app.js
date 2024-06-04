const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.log('Connexion à MongoDB échouée : ' + error));

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Le serveur tourne sur le port ' + port);
});
