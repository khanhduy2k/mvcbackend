const siteRouter = require('./site');
const coursesRouter = require('./courses');
const profileRouter = require('./profile')
const adminRouter = require('./admin');
const authMiddlewares = require('../middlewares/authmiddlewares');


function route(app){
    
    app.use('/admin',  
        authMiddlewares.requireAdminLogin,
        authMiddlewares.requireUser,
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAdmin,
        authMiddlewares.requireAuth, 
    adminRouter);
    
    app.use('/profile',
        authMiddlewares.requireAdminLogin,
        authMiddlewares.requireUser,
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAuth, 
    profileRouter);
    
    app.use('/courses',
        authMiddlewares.requireAdminLogin,
        authMiddlewares.requireUser,
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAuth, 
    coursesRouter);
    
    app.use('/', 
        authMiddlewares.requireAdminLogin,
        authMiddlewares.requireUser,
        authMiddlewares.requireUserlogin,
    siteRouter);
}

module.exports = route;