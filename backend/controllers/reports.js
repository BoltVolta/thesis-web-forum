// require the model
const reports = require('../models/reports');

// async method that uses the functions in the model.
const getReports = async (req, res) => {
    try {
        const response = await reports.findAll();
        if (response) {
            res.send(response);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
const getReportsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await reports.findById(id);
        if (response) {
            res.send(response);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};
const getReportsByPostId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await reports.findByPostId(id);
        if (response) {
            res.send(response);
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};

const createReport = async (req, res) => {
    const report = {
        post_id: req.body.post_id,
        reason: req.body.reason,
        user_id: req.body.user_id
    }

    try {
        const response = await reports.save(report);
        if (response) {
            report.id = response.insertId;
            res.status(201).send(report);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};

const deleteReportById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await reports.deleteById(id);
        if (response) {
            res.send(response[0]);
        }
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

const deleteReportByPostId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await reports.deleteByPostId(id);
        if (response) {
            res.send(response[0]);
        }
    } catch (err) {
        res.status(500).send({ message: "Something went wrong" });
    }
};


// export named functions
module.exports = {
    getReports,
    getReportsById,
    getReportsByPostId,
    createReport,
    deleteReportById,
    deleteReportByPostId
};