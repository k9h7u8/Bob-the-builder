const adminEventServices = require('../service/admin_service');
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminDetails = await adminEventServices.getAdmin(decoded.id);
    if (!adminDetails.isAdmin == true) {
        return next(new Error('you are not an Admin'))
    }
    next();
}

module.exports = { isAdmin };
