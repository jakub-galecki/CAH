const router = require('express').Router();

router.use('/user', require('./user'));

router.use(function(req, res) {
    if (req.baseUrl === '/api') {
        res.status(400);
        res.send('Invalid endpoint.');
    }
});
module.exports = router;
