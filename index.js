const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyparser= require('body-parser');
const cookieparser = require('cookie-parser');
const route = require('./routes');
const app = express();
const sever = require('http').Server(app);
const io = require('socket.io')(sever);
const db = require('./config/db');
const middlewaresSocket = require('./middlewares/socket');
const middlewaresExphbs = require('./middlewares/exphbs');

app.use(cookieparser('back-end-web-2020-vnua'));
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars',exphbs({
    helpers: middlewaresExphbs.helpers
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());

route(app);
const port = process.env.PORT || 8800;
io.on('connection', middlewaresSocket.socket)

sever.listen(port, () => console.log(`App listening at http://localhost:${port}`));