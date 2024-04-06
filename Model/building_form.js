const mongoose = require('mongoose');
const validator = require('validator');

const BuildingFormSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    registeredAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    building_use: {
        type: String,
        required: true,
    },
    story_heights: {
        type: String,
    },
    year_of_construction: {
        type: Date,
    },
    total_built_area: {
        type: Number,
    },
    ground_coverage: {
        type: Number,
    },
    structural_system: {
        type: String,
    },
    foundation_type: {
        type: String,
    },
    geo_technical: {
        type: Boolean,
    },
    structural_drawing: {
        type: Boolean,
    },
    reinforcement: {
        type: Boolean,
    },
    structural_design_calculation: {
        type: Boolean,
    },
    repair_details: {
        type: String,
    },
    seismic_zone: {
        type: Number,
    },
    seismic_safety: {
        type: String,
    },
    structural_dampness: {
        type: Boolean,
    },
    non_structural_dampness: {
        type: Boolean,
    },
    structural_assessment: {
        data: Buffer, // store binary data
        contentType: String // store file type (e.g., 'application/pdf' or 'image/jpeg')
    },
    photographs_outer_profile: {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BuildingForm = mongoose.model('BuildingForm', BuildingFormSchema);

module.exports = BuildingForm; 
