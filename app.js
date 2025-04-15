const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/Auth');
const requireAuth = require('./middlewares/auth');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Routes publiques
app.use('/', authRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Accueil' });
});

// 🔐 Route protégée
app.get('/dashboard', requireAuth, (req, res) => {
  res.send(`Bienvenue dans ton dashboard, user ID : ${req.user.id}`);
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));