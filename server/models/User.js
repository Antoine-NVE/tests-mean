const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, 'pseudo requis'],
        minlength: [3, 'pseudo trop court'],
        maxlength: [15, 'pseudo trop long'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email requis'],
        validate: [
            (email) => {
                const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
                return regex.test(email);
            },
            'email invalide',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'mot de passe requis'],
        validate: [
            (password) => {
                const regex = new RegExp('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$');
                return regex.test(password);
            },
            'mot de passe invalide',
        ],
        maxlength: [40, 'mot de passe trop long'],
    },
});

// On vérifie
userSchema.plugin(uniqueValidator, { message: '{PATH} déjà utilisé' });

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
