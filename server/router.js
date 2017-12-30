const controller = require('./controller');
const contact = require('./contact');

const router = (app) => {
    app.get('/Painter', (req, res) => {
        res.render('painter');
    });
    app.get('/Soundwaves', (req, res) => {
        res.render('soundwaves');
    });
    app.get('/MapSeek', (req, res) => {
        res.render('mapseek');
    });

    app.post('/contact', contact);
    app.get('/project/:name', controller.renderProjectPage);
    app.get('/', controller.renderHomePage);
    app.get('/*', (req, res) => {
      res.render('notFound');
    });
};

module.exports = router;
