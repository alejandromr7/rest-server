

const checkAuth = (req, res, next) => {
    console.log('Desde checkAuth');

    next();
}

module.exports = checkAuth;