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
        .catch((error) => res.status(400).json({ error })); // { error: error.message || error }
};
