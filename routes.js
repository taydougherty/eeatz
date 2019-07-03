module.exports = function(app){

  const application = require('./routes/application');
  const users = require('./routes/users');

  app.use('/', application);
  app.use('/users', users);
}