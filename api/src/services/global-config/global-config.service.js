// Initializes the `globalConfig` service on path `/global-config`
const { GlobalConfig } = require('./global-config.class');
const createModel = require('../../models/global-config.model');
const hooks = require('./global-config.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/global-config', new GlobalConfig(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('global-config');

  service.hooks(hooks);
};
