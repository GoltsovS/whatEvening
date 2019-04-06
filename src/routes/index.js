const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/dist/index.html')
})

module.exports = router