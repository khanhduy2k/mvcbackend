const siteRouter = require('./site');
const coursesRouter = require('./courses');
const profileRouter = require('./profile')
const authMiddlewares = require('../middlewares/authmiddlewares');


function route(app){
    app.use('/profile',authMiddlewares.requireAuth, profileRouter);
    app.use('/courses',authMiddlewares.requireAuth, coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;