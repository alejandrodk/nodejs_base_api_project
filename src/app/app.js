import createError from 'http-errors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import helmet from 'helmet';
import UsersApi from '../components/users/usersAPI';
import MainApi from '../components/main/mainAPI';

class App {
  async init(app, server) {
    const result = dotenv.config();
    const { SESSION_SECRET } = process.env;
    if (result.error) throw result.error;

    // compress all responses
    app.use(compression());

    // CORS
    app.use(cors());

    // Secure HTTP Headers
    app.use(helmet());

    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    // Middlewares
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(logger('dev'));
    app.use(express.json());
    app.use(cookieParser());
    app.use(methodOverride('_method'));
    app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      _expires: 600000,
    }));

    // Routes
    const Users = new UsersApi();
    const Main = new MainApi();

    app.use('/', Main.loadRoutes());
    app.use('/users', Users.loadRoutes());

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}

export default App;
