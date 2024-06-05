const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

exports.register = (req, res) => {
    const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.plainPassword,
    });

    user.save()
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);

            res.status(201).json({ token });
        })
        .catch((error) => {
            let errorMessage = 'Une erreur est survenue';

            // Gestion des erreurs de validation
            if (error.errors) {
                errorMessage = Object.values(error.errors)
                    .map((err) => err.message)
                    .join(', ');
            }

            res.status(400).json({ message: errorMessage }); // { error: error.message || error }
        });
};
