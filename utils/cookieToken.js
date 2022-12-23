const { json } = require('express');
const getJWTToken = require('../helpers/getJwtToken')

const cookieToken = (user, res) => {
    const token = getJWTToken(user.id);
    const options = {
        expires: new Date(Date.now()+3*24*60*1000),
        hhtpOnly: true
    }

    user.password = undefined;
    res.status(200).cookie('token',token,options).json({
        success: true,
        token,
        user
    })
}

module.exports = cookieToken;