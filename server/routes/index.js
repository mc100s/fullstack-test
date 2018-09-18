const express = require('express');
const { isLoggedIn } = require('../middlewares')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const User = require('../models/User')


const router = express.Router();

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json(req.user)
})

router.patch('/profile/picture', isLoggedIn, parser.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    pictureUrl: req.file.secure_url
  })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.secure_url
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      })
    })
})

module.exports = router;
