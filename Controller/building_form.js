const jwt = require('jsonwebtoken');
const BuildingForm = require('../Model/building_form');
const admin = require('../service/admin_service');

const fs = require('fs');
const multer = require('multer');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createAndSaveBuildingForm = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminDetails = await admin.getAdmin(decoded.id);

    upload.fields([{ name: 'file1', maxCount: 1 }, { name: 'file2', maxCount: 1 }])(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'File upload failed', error: err });
        }

        // Read uploaded files
        const files = req.files;
        if (!files || !files.file1 || !files.file2) {
            return res.status(400).json({ message: 'Missing file(s)' });
        }

        // Construct form details
        const FormDetails = {
            admin_id: decoded.id,
            registeredAddress: req.body.registeredAddress,
            city: req.body.city,
            country: req.body.country,
            building_use: req.body.building_use,
            story_heights: req.body.story_heights,
            year_of_construction: req.body.year_of_construction,
            total_built_area: req.body.total_built_area,
            ground_coverage: req.body.ground_coverage,
            structural_system: req.body.structural_system,
            foundation_type: req.body.foundation_type,
            geo_technical: req.body.geo_technical,
            structural_drawing: req.body.structural_drawing,
            reinforcement: req.body.reinforcement,
            structural_design_calculation: req.body.structural_design_calculation,
            repair_details: req.body.repair_details,
            seismic_zone: req.body.seismic_zone,
            seismic_safety: req.body.seismic_safety,
            structural_dampness: req.body.structural_dampness,
            non_structural_dampness: req.body.non_structural_dampness,
            structural_assessment: {
                data: files.file1[0].buffer,
                contentType: files.file1[0].mimetype
            },
            photographs_outer_profile: {
                data: files.file2[0].buffer,
                contentType: files.file2[0].mimetype
            }
        };

        // Save form data
        const form = new BuildingForm(FormDetails);
        try {
            const savedForm = await form.save();
            // res.status(201).json(savedForm);
            res.send("Success");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // const FormDetails = {
    //     admin_id: decoded.id,
    //     registeredAddress: req.body.registeredAddress,
    //     city: req.body.city,
    //     country: req.body.country,
    //     building_use: req.body.building_use,
    //     story_heights: req.body.story_heights,
    //     year_of_construction: req.body.year_of_construction,
    //     total_built_area: req.body.total_built_area,
    //     ground_coverage: req.body.ground_coverage,
    //     structural_system: req.body.structural_system,
    //     foundation_type: req.body.foundation_type,
    //     geo_technical: req.body.geo_technical,
    //     structural_drawing: req.body.structural_drawing,
    //     reinforcement: req.body.reinforcement,
    //     structural_design_calculation: req.body.structural_design_calculation,
    //     repair_details: req.body.repair_details,
    //     seismic_zone: req.body.seismic_zone,
    //     seismic_safety: req.body.seismic_safety,
    //     structural_dampness: req.body.structural_dampness,
    //     non_structural_dampness: req.body.non_structural_dampness,
    //     structural_assessment: req.body.structural_assessment,
    //     photographs_outer_profile: req.body.photographs_outer_profile,

    // }
    // const form = new BuildingForm(FormDetails);
    // const formObject = await form.save().then((data) => {
    //     res.send(data);
    // }).catch(err => {
    //     console.log(err);
    // });
}

module.exports = {
    createAndSaveBuildingForm
}