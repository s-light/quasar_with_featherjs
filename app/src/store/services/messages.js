// https://vuex.feathersjs.com/getting-started.html#service-plugins
import feathersClient, {
    makeServicePlugin,
    BaseModel
} from '../../feathers-client'
import { date } from 'quasar'
// import { format } from 'date-fns'

class Messages extends BaseModel {
    // constructor(data, options) {
    //     super(data, options)
    // }

    // Required for $FeathersVuex plugin to work after production transpile.
    static modelName = 'Messages'

    // Define default properties here
    static instanceDefaults () {
        return {
            text: 'Hello World'
            // createdAt: '20200101'
        }
    }

    static setupInstance (data) {
        if (data.createdAt) {
            data.createdAt = new Date(data.createdAt)
        }
        return data
    }

    get formattedDate () {
        // return format(this.createdAt, 'MMM do, hh:mm:ss')
        return date.formatDate(this.createdAt, 'HH:mm DD.MM.YYYY')
    }
}
const servicePath = 'messages'
const servicePlugin = makeServicePlugin({
    Model: Messages,
    service: feathersClient.service(servicePath),
    servicePath
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
