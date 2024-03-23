
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
}

const register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const userDetails = {
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    }
    // console.log(userDetails)
    const userObject = await User.create(userDetails).then((data) => {
        const token = signToken(data._id);
        res.status(200).json({
            message: "success",
            data: data,
            token: token
        });
    }).catch(err => {
        res.status(500).json({
            message: "error",
            error: err
        });
    });
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email && !password) {
        res.status(400).json({
            message: "Please provide email and password",
        });
    }
    const user = await User.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({
            message: "Incorrect email or password",
        });
    }
    const token = signToken(user._id);
    res.status(200).json({
        message: "success",
        data: user,
        token: token
    });
}


module.exports = {
    register,
    login
}