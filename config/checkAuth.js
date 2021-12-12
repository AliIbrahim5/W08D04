module.exports = {
    authentication: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.json({error:'Please log in first!'});
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
};