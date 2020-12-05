const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyparser= require('body-parser');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const route = require('./routes');
const db = require('./config/db');
//apply

const app = express();
app.use(cookieparser('back-end-web-2020-vnua'));
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

// handlebras&body-parser
app.engine('handlebars', exphbs({
    helpers: {
        
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());

//apply routes
route(app);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));