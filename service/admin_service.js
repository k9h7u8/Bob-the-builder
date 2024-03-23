const Admin = require('../Model/user');

const getAdmin = async (id) => {
    resultObject = await Admin.findById(id).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
    return resultObject;
}

module.exports = {
    getAdmin
}