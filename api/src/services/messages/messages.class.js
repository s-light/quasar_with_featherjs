const { Service } = require('feathers-nedb');

exports.Messages = class Messages extends Service {
    // eslint-disable-next-line no-unused-vars
    async find(params) {
        console.log('message find');
    }
    // eslint-disable-next-line no-unused-vars
    async get(id, params) {
        console.log('message get');
    }
    // eslint-disable-next-line no-unused-vars
    async create(data, params) {
        console.log('message created');
    }
    // eslint-disable-next-line no-unused-vars
    async update(id, data, params) {
        console.log('message update');
    }
    // eslint-disable-next-line no-unused-vars
    async patch(id, data, params) {
        console.log('message patch');
    }
    // eslint-disable-next-line no-unused-vars
    async remove(id, params) {
        console.log('message remove');
    }
};
