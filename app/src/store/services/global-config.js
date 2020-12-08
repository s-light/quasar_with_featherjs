// https://vuex.feathersjs.com/getting-started.html#service-plugins
import feathersClient, {
    makeServicePlugin,
    BaseModel
} from '../../feathers-client'

class GlobalConfig extends BaseModel {
    // constructor(data, options) {
    //     super(data, options)
    // }

    // Required for $FeathersVuex plugin to work after production transpile.
    static modelName = 'GlobalConfig'

    // Define default properties here
    static instanceDefaults () {
        return {
            // name: 'Hello',
            value: null
            // description: 'Summer!'
        }
    }
}
const servicePath = 'global-config'
const servicePlugin = makeServicePlugin({
    Model: GlobalConfig,
    service: feathersClient.service(servicePath),
    servicePath,
    // https://vuex.feathersjs.com/service-plugin.html#configuration
    // idField: 'name',
    // tempIdField: '__name',
    debug: true
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
    before: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
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
})

export default servicePlugin
