const Mongooose = require('mongoose');
const Schema = Mongooose.Schema;

const DonutSchema = new Schema({
    name: {type: String, required: true},
    glace: {type: String, required: true},
    topping: {type: String, required: true},
    logo: {type: String, required: true},
    shape: {type: String, required: true},
    amount: {type: Number, required: true},
    email: {type: String, required: true},
    company: {type: String, required: true},
    extra: {type: String, required: true},
    status: {type: String, default: "Aangevraagd"},
});

const Donut = Mongooose.model('Donut', DonutSchema);

module.exports = Donut;