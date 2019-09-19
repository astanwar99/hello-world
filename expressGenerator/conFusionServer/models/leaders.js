// {
//     "name": "Weekend Grand Buffet",
//     "image": "images/buffet.png",
//     "label": "New",
//     "price": "19.99",
//     "description": "Featuring . . .",
//     "featured": false
// }
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

var Leaders = mongoose.model('leader', leaderSchema);

module.exports = Leaders;