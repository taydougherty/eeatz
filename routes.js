module.exports = function(app){

  const application = require('./routes/application');
  const add = require('./routes/add');
  const home = require('./routes/home');
  const history = require('./routes/history');
  const users = require('./routes/users');


  app.use('/', application);
  app.use('/add', add);
  app.use('/home', home);
  app.use('/history', history);
  app.use('/users', users);
}