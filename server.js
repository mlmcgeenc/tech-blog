// make the frontend available to the client via middleware
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
	secret: 'Super secret secret',
  cookie: { maxAge: 300000 },
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware so express knows how to handle incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./controllers');

// turn on routes
// routes must be after all static calls
// app.use(routes);
app.use(require('./controllers/'));

// turn on connect to db and server
// force: true resyncs the connections and tables recreated
// this includes DROPPING any data or records stored on the server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('>> NOW LISTENING'));
});
