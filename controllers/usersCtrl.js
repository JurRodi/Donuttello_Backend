const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) return console.log(err);
        if (!foundUser) {
            let response = {
                status: "error",
                message: "User " + req.body.username + " not found"
            }
            res.json(response);
        } else {
            const samePassword = bcrypt.compareSync(req.body.password, foundUser.password);
            if (samePassword) {
                let response = {
                    status: "success",
                    message: "User " + foundUser.username + " logged in successfully",
                    data: {
                        user: foundUser
                    }
                }
                res.json(response);
            } else {
                let response = {
                    status: "error",
                    message: "Incorrect password for user: " + foundUser.username
                }
                res.json(response);
            }
        }
    });
};

const changePassword = (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) return console.log(err);
        if (!foundUser) {
            let response = {
                status: "error",
                message: "User " + req.body.username + " not found"
            }
            res.json(response);
        } else {
            const oldPassword = bcrypt.compareSync(req.body.oldPassword, foundUser.password);
            if (oldPassword) {
                const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
                foundUser.password = hashedPassword;
                foundUser.save((err, updatedUser) => {
                    if (err) return console.log(err);
                    let response = {
                        status: "success",
                        message: "Password changed successfully for user: " + updatedUser.username,
                        data: {
                            user: updatedUser
                        }
                    }
                    res.json(response);
                });
            } else {
                let response = {
                    status: "error",
                    message: "Incorrect password for user: " + foundUser.username + ". Password not changed."
                }
                res.json(response);
            }
        }
    });
};

module.exports = {
    login,
    changePassword
};