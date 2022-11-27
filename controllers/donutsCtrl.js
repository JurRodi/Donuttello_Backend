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

module.exports = {
    getAllDonuts
}