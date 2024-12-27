import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import 'dotenv/config';

import routes from './routes';

// create express app
const app = express();

// server port
const port = process.env.PORT || 3139;

// static files - currently unused
app.use(express.static(path.join(__dirname, 'assets')));

// View engine
app.set('view engine', 'ejs');
// set up views folder
app.set('views', path.resolve(__dirname, 'views'));

// ----- Middlewares ----- //
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors()); // enable for experimental purposes
// CORS configuration - allow only requests from a specific domain
app.use(
  cors({
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'Accept'],
    origin: process.env.ALLOWED_DOMAIN,
    optionsSuccessStatus: 200,
  })
);

// Sample welcome page
app.get('/', (_req, res) => {
  res.render('index', { title: 'Email Server' });
});

// ----- Routes ----- //
app.use('/api', routes);

// start server
app.listen(port, () => {
  console.log(`CORS-enabled web server listening on http://localhost:${port}`);
});

export default app;
