let swag = require('../models/swag') 

module.exports = {
  add: (req, res) => {
    let {id} = req.params
    let {session} = req
    let swagInCart = session.cart.find(swagItem => swagItem.id == id)
    if (!swagInCart){
      let swagItem = swag.find(swagItem => swagItem.id == id)
      session.user.cart.push(swagItem)
      session.user.total += swagItem.price
      res.status(200).send(session.user)
    } else {
      res.status(200).send(session.user)
    }
  },

  delete: (req, res) => {
    let {session} = req
    let {id} = req.params
    let indexInCart = session.cart.findIndex(swagItem => swagItem.id == id)
    if (indexInCart !== -1) {
      session.user.total -= session.user.cart[indexInCart].price
      session.user.cart.splice(indexInCart, 1)
    }
    res.status(200).send(session.user)
  }, 

  checkout: (req, res) => {
    let {session} = req
    session.user.cart = []
    session.user.total = 0
    res.status(200).send(session.user)
  }
}