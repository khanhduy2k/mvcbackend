const siteRouter = require('./site');
const coursesRouter = require('./courses');


function route(app){
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;