const assert = require('assert');
const app = require('../../src/app');

describe('\'globalConfig\' service', () => {
  it('registered the service', () => {
    const service = app.service('global-config');

    assert.ok(service, 'Registered the service');
  });
});
