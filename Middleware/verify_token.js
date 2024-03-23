const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const isVerified = async (req, res, next) => {
    let token;
    console.log(req.headers)
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new Error('you are not logged in! Please login to get access'))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
}

module.exports = { isVerified };
