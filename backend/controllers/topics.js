// require the model
const topics = require('../models/topics');

// async method that uses the functions in the model.
const getTopics = async (req, res) => {
    try {
        const response = await topics.findAll();
        if (response) {
            res.send(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
const getTopicsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await topics.findById(id);
        if (response) {
            res.send(response);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};

const createTopic = async (req, res) => {
    const topic = {
        name: req.body.name
    }

    try {
        const response = await topics.save(topic);
        if (response) {
            topic.id = response.insertId;
            res.status(201).send(topic);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};

const deleteTopicById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await topics.deleteById(id);
        if (response) {
            res.send(response[0]);
        }
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }
};


// export named functions
module.exports = {
    getTopics,
    getTopicsById,
    createTopic,
    deleteTopicById
};