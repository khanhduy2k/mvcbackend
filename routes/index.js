const siteRouter = require('./site');
const coursesRouter = require('./courses');
const profileRouter = require('./profile')
const adminRouter = require('./admin');
const authMiddlewares = require('../middlewares/authmiddlewares');

const middleWares = [
    authMiddlewares.requireUser,
    authMiddlewares.requireAdminLogin,
    authMiddlewares.requireUserlogin,
]

function route(app){
    app.use('/admin',  
        middleWares,
        authMiddlewares.requireAdmin,
        authMiddlewares.requireAuth, 
    adminRouter);

    app.use('/profile',
        middleWares,
        authMiddlewares.requireAuth, 
    profileRouter);

    app.use('/courses',
        middleWares,
        authMiddlewares.requireAuth, 
    coursesRouter);

    app.use('/', 
        middleWares,
    siteRouter);
}

module.exports = route;