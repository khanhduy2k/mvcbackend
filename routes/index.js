const siteRouter = require('./site');
const coursesRouter = require('./courses');
const profileRouter = require('./profile')
const adminRouter = require('./admin');
const authMiddlewares = require('../middlewares/authmiddlewares');


function route(app){
    app.use('/', 
        authMiddlewares.requireUser,
        authMiddlewares.requireAdminLogin,
        authMiddlewares.requireUserlogin,
    siteRouter);

    app.use('/admin',  
        authMiddlewares.requireAdmin,
        authMiddlewares.requireAuth, 
    adminRouter);

    app.use('/profile',
        authMiddlewares.requireAuth, 
    profileRouter);

    app.use('/courses',
        authMiddlewares.requireAuth, 
    coursesRouter);

}

module.exports = route;