import Vue from 'vue'
import Vuex from 'vuex'
import { FeathersVuex } from '../feathers-client'

// import example from './module-example'
import appconfig from './appconfig'

// automagically import all ./service/* files
const requireModule = require.context(
    // The path where the service modules live
    './services',
    // Whether to look in subfolders
    false,
    // Only include .js files (prevents duplicate imports`)
    /\.js$/
)
const servicePlugins = requireModule
    .keys()
    .map(modulePath => requireModule(modulePath).default)

// ------------------------------------------
// init
// ------------------------------------------

// Use a new variable and export values to change default behavior.
let store = null

Vue.use(Vuex)
Vue.use(FeathersVuex)

/*
* If not building with SSR mode, you can
* directly export the Store instantiation;
*
* The function below can be async too; either use
* async/await or return a Promise which resolves
* with the Store instance.
*/

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            // add store reference here
            appconfig
        },
        plugins: [...servicePlugins],

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING
    })

    // live / hot reload magic
    if (process.env.DEV && module.hot) {
        module.hot.accept(['./appconfig'], () => {
            const newAppConfig = require('./appconfig').default
            Store.hotUpdate({ modules: { appconfig: newAppConfig } })
        })
    }

    // add this so that we export store
    store = Store

    return Store
}

// add this line to access store wherever you need
export { store }
