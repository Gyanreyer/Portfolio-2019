const projectPage = require('./projects');
const contact = require('./contact');

const router = (app) => {
  app.post('/contact');
  app.get('/project/:name', projectPage);
  app.get('/', (req, res) => {
    res.render('home');
  });
  app.get('/*', (req, res) => {
    res.render('notFound');
  });
};

module.exports = router;
