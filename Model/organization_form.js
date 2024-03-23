const mongoose = require('mongoose');
const validator = require('validator');

const organizationFormSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    building_name: {
        type: String,
        required: true
    },
    office_number: {
        type: Number,
        required: true,
        maxLength: 10
    },
    building_address: {
        type: String,
        required: true,
    },
    alternate_number: {
        type: Number,
        required: true,
        maxLength: 10
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const organizationForm = mongoose.model('OrganizationForm', organizationFormSchema);

module.exports = organizationForm; 
