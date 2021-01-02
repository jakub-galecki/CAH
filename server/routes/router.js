const router = require('express').Router();

router.use('/user', require('./auth'));

router.use(function(req, res) {
    if (req.baseUrl !== '/user') {
        res.status(400);
        res.send('Invalid endpoint.');
    }
});
module.exports = router;
