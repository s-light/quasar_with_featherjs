// inspired by mapBind.js
// https://vuex.feathersjs.com/feathers-vuex-forms.html#feathersvuexinputwrapper

// ------------------------------------------
// usage:
// import { mapBindIDItems } from 'store/mapBindIDItems.js'
//
// export default {
//     name: 'ComponentName',
//     computed: {
//         ...mapBindIDItems('global-config', ['serialDevice', 'someOtherThing'])
//     },
// }

import Vue from 'vue'
import {
    // useFind,
    useGet
} from 'feathers-vuex'
import { models } from '../feathers-client'

function capitalizeFirstLetter (string) {
    // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    return string.charAt(0).toUpperCase() + string.slice(1)
}
function decapitalizeFirstLetter (string) {
    return string.charAt(0).toLowerCase() + string.slice(1)
}

function servicePath2modelClassName (servicePath) {
    let modelParts = servicePath.split('-')
    modelParts = modelParts.map(item => { return capitalizeFirstLetter(item) })
    // console.log('modelParts', modelParts)
    const modelClassName = modelParts.join('')
    return modelClassName
}

export const findList = async function (servicePath) {
    console.group('findList')
    const modelClassName = servicePath2modelClassName(servicePath)
    const ModelClass = models.api[modelClassName]
    const params = {
        query: {},
        paginate: false
    }
    const resultFind = await ModelClass.find(params)
    console.log('resultFind', resultFind)
    const gcList = resultFind.data
    console.log('gcList', gcList)
    // ModelClass.find(params).then((resultFind) => {
    //     console.group('findList.then')
    //     console.log('resultFind', resultFind)
    //     const gcList = resultFind.data
    //     console.log('gcList', gcList)
    //     if (gcList) {
    //         return gcList
    //     }
    //     console.groupEnd()
    // }).catch((error) => {
    //     console.error(error.message, error)
    // })
    console.groupEnd()
    return gcList
}

export const mapBindIDItems = function (servicePath, entryNames) {
    // helper function for vuex
    // create setter and getter functions for given store and properties

    // ------------------------------------------
    // global
    const resultServicePath = {}
    const resultEntries = {}

    // console.log('models.api', models.api)
    // const ModelClass = this.$FeathersVuex.api[servicePath2modelClassName(servicePath)]
    const modelClassName = servicePath2modelClassName(servicePath)
    // console.log('modelClassName', modelClassName)
    const ModelClass = models.api[modelClassName]
    // console.log('ModelClass', ModelClass)
    const servicePathName = decapitalizeFirstLetter(modelClassName)

    // ------------------------------------------
    // prepare empty base
    const reactiveBase = {}
    // reactiveBase.gcList = []
    Vue.set(reactiveBase, 'gcList', {})
    // Vue.set(reactiveBase, 'gcList', [])
    console.log('reactiveBase', reactiveBase)
    resultServicePath[servicePathName] = {
        get: function () {
            return reactiveBase.gcList
        }
    }

    console.log('entryNames', entryNames)
    for (const entryName of entryNames) {
        resultEntries[entryName] = {
            get: function () {
                return null
            },
            set: function (val) {
            }
        }
    }

    // ------------------------------------------
    // servicePath setup
    // const resultUseFind = useFind({
    //     model: ModelClass,
    //     params: {
    //         query: {}
    //     }
    // })
    // console.log('resultUseFind', resultUseFind)
    // console.log('resultUseFind.items', resultUseFind.items)
    // console.log('resultUseFind.itmes.value', resultUseFind.items.value)
    // // let servicePathEntryList = []
    // if (resultUseFind.items.value) {
    //     // servicePathEntryList = resultUseFind.items.value
    //     resultEntries[decapitalizeFirstLetter(modelClassName)] = {
    //         get: function () {
    //             // return servicePathEntryList
    //             return resultUseFind.items.value
    //         }
    //     }
    // }
    // Vue.set(obj,...)
    const params = {
        query: {},
        paginate: false
    }
    // try {
    //     const resultFind = await ModelClass.find(params)
    //     console.group('mapBindIDItems find.then')
    //     console.log('resultFind', resultFind)
    //     reactiveBase.gcList = resultFind.data
    //     console.log('reactiveBase.gcList', reactiveBase.gcList)
    //     if (reactiveBase.gcList) {
    //         result[servicePathName].get = function () {
    //             return reactiveBase.gcList
    //         }
    //     }
    //     console.groupEnd()
    // } catch (e) {
    //     console.error(e.message, e)
    // } finally {
    //
    // }
    ModelClass.find(params).then((resultFind) => {
        console.group('mapBindIDItems find.then')
        console.log('resultFind', resultFind)
        // reactiveBase.gcList = resultFind.data
        // // https://vuejs.org/v2/guide/reactivity.html#For-Arrays
        // reactiveBase.gcList = resultFind.data
        // Vue.set(reactiveBase, 'gcList', resultFind.data)
        // // clear existing array
        // reactiveBase.gcList.splice(0)
        // // fill existing array
        for (const item of resultFind.data) {
            reactiveBase.gcList[item.id] = item
        }
        console.log('reactiveBase.gcList', reactiveBase.gcList)
        // if (reactiveBase.gcList) {
        //     result[servicePathName].get = function () {
        //         return reactiveBase.gcList
        //     }
        // }
        console.groupEnd()
    }).catch((error) => {
        console.error(error.message, error)
    })
    // this seems to not work.. i think the references are broken..

    // ------------------------------------------
    // entryNames setup
    for (const entryName of entryNames) {
        console.group('entryName: ' + entryName)
        // console.log('ModelClass', ModelClass)
        // get from server and store
        const resultUseGet = useGet({
            model: ModelClass,
            id: entryName,
            _id: entryName
        })
        console.log('resultUseGet', resultUseGet)
        console.log('resultUseGet.item', resultUseGet.item)
        console.log('resultUseGet.item.value', resultUseGet.item.value)
        let gcItem = resultUseGet.item.value
        console.log('gcItem', gcItem)
        // check if item exists
        if (!gcItem) {
            // create new item
            console.log('create new item')
            gcItem = new ModelClass({
                id: entryName,
                _id: entryName,
                value: null
            })
            gcItem.create().catch((error) => {
                console.error('mapBindIDItems: create - ' + error.message, error)
            })
        }
        const gcItemClone = gcItem.clone()
        console.log(entryName + ' gcItem', gcItem)
        console.log(entryName + ' gcItemClone', gcItemClone)
        resultEntries[entryName].get = function () {
            return gcItemClone.value
        }
        resultEntries[entryName].set = function (val) {
            gcItemClone.value = val
            gcItemClone.commit()
            gcItem.patch({ data: { value: val } })
        }
        console.groupEnd()
    }
    const result = Object.assign({}, resultServicePath, resultEntries)
    console.log('result', result)
    return result
// )
}
