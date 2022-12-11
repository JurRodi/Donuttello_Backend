require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) return console.log(err)
    if (!foundUser) {
      let response = {
        status: 'error',
        message: 'User ' + req.body.username + ' not found',
      }
      res.json(response)
    } else {
      const samePassword = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      )
      if (samePassword) {
        function generateAccessToken(username) {
          return jwt.sign(username, process.env.TOKEN_SECRET, {
            expiresIn: '3600s',
          })
        }
        const token = generateAccessToken({ username: req.body.username })
        let response = {
          status: 'success',
          message: 'User ' + foundUser.username + ' logged in successfully',
          data: {
            user: foundUser,
            token: token,
          },
        }
        res.json(response)
      } else {
        let response = {
          status: 'error',
          message: 'Incorrect password for user: ' + foundUser.username,
        }
        res.json(response)
      }
    }
  })
}

const changePassword = (req, res) => {
  if (!req.body.username || !req.body.passwordOld || !req.body.passwordNew) {
    let response = {
      status: 'error',
      message: 'Missing username, old password or new password',
    }
    return res.status(400).json(response)
  }
  try {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) throw new Error(err)
      if (!foundUser) {
        let response = {
          status: 'error',
          message: 'User ' + req.body.username + ' not found',
        }
        return res.status(422).json(response) // TODO juiste status toevoegen checken of 422 juist is
      } else {
        console.log('foundUser: ', foundUser)
        console.log('Old pwd', req.body.passwordOld)
        console.log('user pwd', foundUser.password)

        const oldPassword = bcrypt.compareSync(
          req.body.passwordOld,
          foundUser.password
        )
        console.log('oldPassword: ', oldPassword)

        if (oldPassword) {
          const hashedPassword = bcrypt.hashSync(req.body.passwordNew, 10)

          console.log('hashedPassword', hashedPassword)

          foundUser.password = hashedPassword
          foundUser.save((err, updatedUser) => {
            if (err) return console.log(err)
            let response = {
              status: 'success',
              message:
                'Password changed successfully for user: ' +
                updatedUser.username,
              data: {
                user: updatedUser,
              },
            }
            res.json(response)
          })
        } else {
          let response = {
            status: 'error',
            message:
              'Incorrect password for user: ' +
              foundUser.username +
              '. Password not changed.',
          }
          res.json(response)
        }
      }
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  login,
  changePassword,
}
