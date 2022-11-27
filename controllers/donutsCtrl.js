const Donut = require('../models/donut');

const getAllDonuts = (req, res) => {
    Donut.find({}, (err, allDonuts) => {
        if (err) return console.log(err);
        let response = {
            status: "success",
            message: "All donuts retrieved",
            data: {
                donuts: allDonuts
            }
        }
        res.json(response);
    });
};

const createDonut = (req, res) => {
    Donut.create(req.body, (err, newDonut) => {
        if (err) return console.log(err);
        let response = {
            status: "success",
            message: "New donut created",
            data: {
                donut: newDonut
            }
        }
        res.json(response);
    });
};

module.exports = {
    getAllDonuts,
    createDonut
}