// {
//     "name": "Peter Pan",
//     "image": "images/alberto.png",
//     "designation": "Chief Epicurious Officer",
//     "abbr": "CEO",
//     "description": "Our CEO, Peter, . . .",
//     "featured": false
// }

const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
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
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

var Promotions = mongoose.model('promotion', promotionSchema);

module.exports = Promotions;