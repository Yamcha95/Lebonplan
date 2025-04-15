app.get('/', (req, res) => {
    res.render('pages/home', { title: 'Accueil' });
  });