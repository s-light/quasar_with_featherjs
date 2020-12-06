const messages = require('./messages/messages.service.js');
const MyObjectList = require('./my-object-list/my-object-list.service.js');
const globalConfig = require('./global-config/global-config.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(messages);
    app.configure(MyObjectList);
    app.configure(globalConfig);
};
