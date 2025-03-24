const { Router } = require('express')

const router = Router()

router.post('/updatepassword', require('../controllers/updatePassword'))

module.exports = router;