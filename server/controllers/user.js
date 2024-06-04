const User = require('../models/User');

exports.register = (req, res) => {
    const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: req.body.plainPassword,
    });

    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch((error) => res.status(400).json({ error })); // { error: error.message || error }
};
