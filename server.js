const express = require('express');
const session = require('express-session');
const expresshndlbrs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');
const routes = require('./controllers');

const sequelize = require('./config/connections');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hndlbrs = expresshndlbrs.create({ helpers });

const sess = {
    secret: '',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hndlbrs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('App launched!'));
});