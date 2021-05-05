const siteRouter = require('./site');
const coursesRouter = require('./courses');
const profileRouter = require('./profile')
const adminRouter = require('./admin');
const authMiddlewares = require('../middlewares/authmiddlewares');


function route(app){
    
    app.use('/admin',  
        authMiddlewares.requireCollaborators,
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAuth, 
    adminRouter);
    
    app.use('/profile',    
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAuth, 
    profileRouter);
    
    app.use('/courses',
        authMiddlewares.requireUserlogin,
        authMiddlewares.requireAuth, 
    coursesRouter);
    
    app.use('/', 
        authMiddlewares.requireUserlogin,
    siteRouter);
}

module.exports = route;