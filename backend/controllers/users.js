const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const users = require('../models/users');

const signUpUser = async (req, res) => {
    const { id, username, email, password, admin } = req.body;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).send(err);
    }
    const newUser = {
        id,  //id: v4(),
        username,
        email,
        password: hashedPassword,
        admin
    };

    try {
        const exist = await users.findByEmail(newUser.email);
        if (exist.length > 0) {
            return res.status(422).send('Could not create user, user exists 1');
        }

        const result = await users.create(newUser);
        console.log(result);
        if (!result) {
            return res.status(500).send('Could not create user, try again please 2');
        }

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            token
        })

    } catch (err) {
        return res.status(500).send(err);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    let identifiedUser;
    try {
        const result = await users.findByEmail(email);
        if (!result[0]) {
            return res.status(401).send('No user found - Check your credentials');
        }
        identifiedUser = result[0];
        console.log(identifiedUser);
    } catch (err) {
        return res.status(500).send(err);
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, identifiedUser.password);
        if (!isValidPassword) {
            return res.status(401).send('No user found - Check your credentials');
        }
        console.log(isValidPassword);
    } catch (err) {
        return res.status(500).send(err);
    }

    try {
        console.log("here?");
        const token = jwt.sign(
            {
                id: identifiedUser.id,
                email: identifiedUser.email
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
        console.log("here?");
        res.status(201).json({
            id: identifiedUser.id,
            email: identifiedUser.email,
            admin: identifiedUser.admin,
            token
        })
    } catch (err) {
        return res.status(500).send("err");
    }
};

const getUsers = async (req, res) => {
    try {
        const response = await users.findAll();
        if (response) {
            res.send(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const response = await users.findByEmail(email);
        if (response) {
            res.send(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);;
        const response = await users.findUserById(id);
        if (response) {
            res.send(response);
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    loginUser,
    signUpUser,
    getUserByEmail,
    getUserById,
    getUsers
}