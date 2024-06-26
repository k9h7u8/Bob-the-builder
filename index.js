const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT;
const config = require('./config');
const userController = require('./Controller/user');
const organizationFormController = require('./Controller/organization_form');
const buildingFormController = require('./Controller/building_form');
const isLoggedIn = require('./Middleware/verify_token');
const checkAdmin = require('./Middleware/check_admin');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/app', (req, res) => {
    res.send("Hello")
});

//Authentication
app.post('/register', userController.register);
app.post('/login', userController.login);

//Organization Form
app.post('/applicationForm', isLoggedIn.isVerified, checkAdmin.isAdmin, organizationFormController.createAndSaveForm);
app.get('/getFormDetails', isLoggedIn.isVerified, checkAdmin.isAdmin, organizationFormController.getByAdminId);
app.put('/updateForm', isLoggedIn.isVerified, checkAdmin.isAdmin, organizationFormController.updateForm);

//Building Form
app.post('/buildingForm', isLoggedIn.isVerified, checkAdmin.isAdmin, buildingFormController.createAndSaveBuildingForm);
app.get('/getBuildings', isLoggedIn.isVerified, buildingFormController.getByAdminId);
app.get('/BuildingDetails/:buildingId', isLoggedIn.isVerified, checkAdmin.isAdmin, buildingFormController.getById);

app.listen(port,
    console.log(`Listening to port ${port}`)
)