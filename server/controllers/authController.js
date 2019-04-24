let users = require('../models/users')
let id = 1

module.exports = {
  register: (req, res) => {
    let {session} = req
    let {username, password} = req.body
    users.push({
      id: id,
      username: username,
      password: password
    })
    id++
    session.user.username = username
    res.status(200).send(session.user)
  },

  login: (req, res) => {
    let {session} = req
    let {username, password} = req.body
    let user = users.find(user => user.username === username && user.password === password)
    if (user) {
      session.user.username = username
      res.status(200).send(session.user)
    } else {
      res.status(500).send('Unauthorized')
    }
  },

  signout: (req, res) => {
    let {session} = req
    session.destroy()
    res.status(200).send(session)
  },

  getUser: (req, res) => {
    let {session} = req
    res.status(200).send(session.user)
  }
}