const express = require('express');
const Country = require('../models/country')
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    // .populate('_creator')
    .populate({ path: '_creator', select: 'username' })
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

// Route to add a country
router.post('/', isLoggedIn, (req, res, next) => {
  let _creator = req.user._id
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description, _creator })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  Country.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => {
      return {
        success: false,
        error: err
      }
    })
})

module.exports = router;
