const projectPage = require('./projects');

const router = (app) => {
  app.post('/sendContactMessage');
  app.get('/project/:name', projectPage);
  app.get('/', (req, res) => {
    res.render('home');
  });
  app.get('/*', (req, res) => {
    res.render('notFound');
  });
};

module.exports = router;
