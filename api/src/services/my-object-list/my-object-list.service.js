// Initializes the `MyObjectList` service on path `/my-object-list`
const { MyObjectList } = require('./my-object-list.class');
const createModel = require('../../models/my-object-list.model');
const hooks = require('./my-object-list.hooks');

module.exports = function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/my-object-list', new MyObjectList(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('my-object-list');

    service.hooks(hooks);
};
