const assert = require('assert');
const app = require('../../src/app');

describe('\'MyObjectList\' service', () => {
  it('registered the service', () => {
    const service = app.service('my-object-list');

    assert.ok(service, 'Registered the service');
  });
});
