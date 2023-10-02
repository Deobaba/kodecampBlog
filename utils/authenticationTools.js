const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


exports.generateToken = (userID) => {
    return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
}) }

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

exports.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}


