const jwt = require('jsonwebtoken');
const OrganizationForm = require('../Model/organization_form');
const admin = require('../service/admin_service');

const createAndSaveForm = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminDetails = await admin.getAdmin(decoded.id);
    const FormDetails = {
        admin_id: decoded.id,
        building_name: req.body.building_name,
        office_number: req.body.office_number,
        building_address: req.body.building_address,
        alternate_number: req.body.alternate_number,
        city: req.body.city,
        country: req.body.country,
        pincode: req.body.pincode
    }
    const form = new OrganizationForm(FormDetails);
    const formObject = await form.save().then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
}

const getByFormId = async (req, res) => {
    const formObject = await OrganizationForm.find({ _id: req.params.formId }).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
}

const updateForm = async (req, res) => {
    const formDetails = {
        building_name: req.body.building_name,
        office_number: req.body.office_number,
        building_address: req.body.building_address,
        alternate_number: req.body.alternate_number,
        city: req.body.city,
        country: req.body.country,
        pincode: req.body.pincode
    }
    const formObject = await OrganizationForm.findByIdAndUpdate(req.params.formId, {
        $set: formDetails
    }, {
        new: true,
        useFindAndModify: false
    }).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
}

const deleteForm = async (req, res) => {
    const formObject = await OrganizationForm.findByIdAndDelete(req.params.formId).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    createAndSaveForm,
    getByFormId,
    updateForm,
    deleteForm
}