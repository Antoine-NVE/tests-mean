const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '24h' });

            res.status(201).json({ message: 'Authentifié', token });
        })
        .catch((error) => {
            const errorMessage = Object.values(error.errors)
                .map((err) => err.message)
                .join(', ');

            res.status(400).json({ message: errorMessage }); // { error: error.message || error }
        });
};

exports.login = (req, res) => {
    User.findOne({ $or: [{ pseudo: req.body.identifier }, { email: req.body.identifier }] })
        .then((user) => {
            if (user === null) {
                // Si l'utilisateur n'existe pas
                res.status(401).json({ message: 'Informations de connexion incorrectes' });
            } else {
                bcrypt
                    .compare(req.body.plainPassword, user.password)
                    .then((valid) => {
                        if (!valid) {
                            // Si le mot de passe est incorrect
                            res.status(401).json({ message: 'Informations de connexion incorrectes' });
                        } else {
                            const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '24h' });

                            res.status(200).json({ message: 'Authentifié', token });
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ message: error });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error });
        });
};

// exports.getInformations

// exports.isAuthenticated
