const createError = require('http-errors');

// 404 not found handler
function notFoundHandler(req, res, next) {
    next(createError(404, 'Your requested content was not found!'));
}

// default error handler
function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);

    // render the error page
    if (res.locals.html) {
        // if the request is html then render the error page
        res.render('error', {
            title: 'Error Page',
        });
    } else {
        // if the request is json then send the error as json
        res.json(res.locals.error);
    }
}

module.exports = {
    notFoundHandler,
    errorHandler,
};
