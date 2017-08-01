import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' })
})

router.get('*', function(req, res, next) {
  res.render('index', { title: 'index' })
})

export default router
