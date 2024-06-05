const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, 'Pseudo requis'],
        minlength: [3, '3 caractères minimum'],
        maxlength: [15, '15 caractères maximum'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email requis'],
        validate: [
            (email) => {
                const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
                return regex.test(email);
            },
            'Email invalide',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Mot de passe requis'],
        validate: [
            (password) => {
                const regex = new RegExp('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
                return regex.test(password);
            },
            'Mot de passe invalide',
        ],
        maxlength: [40, '40 caractères maximum'],
    },
});

// On vérifie
userSchema.plugin(uniqueValidator, { message: 'Pseudo et/ou email invalide(s)' });

// A la sauvegarde, on hash le password
userSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = mongoose.model('User', userSchema);

// unique validation, création et envoie d'un token sur le front
