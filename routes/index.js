const siteRouter = require('./site');
const coursesRouter = require('./courses');
const authMiddlewares = require('../middlewares/authmiddlewares');


function route(app){
    app.use('/courses',authMiddlewares.requireAuth, coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;