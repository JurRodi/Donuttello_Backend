const Mongooose = require('mongoose');
const Schema = Mongooose.Schema;

const DonutSchema = new Schema({
    color: {type: String, required: true},
    topping: {type: String, required: true},
    logo: {type: String, required: true},
    email: {type: String, required: true},
    company: {type: String, required: true},
});

const Donut = Mongooose.model('Donut', DonutSchema);

module.exports = Donut;