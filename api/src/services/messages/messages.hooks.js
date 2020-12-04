
const processMessage = require('../../hooks/process-message');

const setTimestamp = require('../../hooks/set-timestamp');

module.exports = {
    before: {
        all: [],
        find: [],
        get: [],
        create: [processMessage(), setTimestamp('createdAt')],
        update: [setTimestamp('updatedAt')],
        patch: [],
        remove: []
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
