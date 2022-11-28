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

const deleteDonut = (req, res) => {
    Donut.findByIdAndDelete(req.params.id, (err, deletedDonut) => {
        if (err) return console.log(err);
        let response = {
            status: "success",
            message: "Donut deleted successfully with id: " + req.params.id,
            data: {
                donut: deletedDonut
            }
        }
        res.json(response);
    });
};

const updateDonut = (req, res) => {
    Donut.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedDonut) => {
        if (err) return console.log(err);
        let response = {
            status: "success",
            message: "Donut updated successfully with id: " + req.params.id,
            data: {
                donut: updatedDonut
            }
        }
        res.json(response);
    });
};

const getDonutById = (req, res) => {
    Donut.findById(req.params.id, (err, foundDonut) => {
        if (err) return console.log(err);
        let response = {
            status: "success",
            message: "Donut retrieved successfully with id: " + req.params.id,
            data: {
                donut: foundDonut
            }
        }
        res.json(response);
    });
};

module.exports = {
    getAllDonuts,
    createDonut,
    deleteDonut,
    updateDonut,
    getDonutById
}