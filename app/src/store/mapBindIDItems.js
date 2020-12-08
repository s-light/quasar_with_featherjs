// inspired by mapBind.js
// https://vuex.feathersjs.com/feathers-vuex-forms.html#feathersvuexinputwrapper

import {
    useFind,
    useGet
} from 'feathers-vuex'
import { models } from '../feathers-client'

export const mapBindIDItems = function (servicePath, entryNames) {
    // helper function for vuex
    // create setter and getter functions for given store and properties
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

    // ------------------------------------------
    // global
    const result = {}

    // console.log('models.api', models.api)
    // const ModelClass = this.$FeathersVuex.api[servicePath2modelClassName(servicePath)]
    const modelClassName = servicePath2modelClassName(servicePath)
    // console.log('modelClassName', modelClassName)
    const ModelClass = models.api[modelClassName]
    // console.log('ModelClass', ModelClass)

    // ------------------------------------------
    // servicePath setup
    const resultUseFind = useFind({
        model: ModelClass,
        params: {
            query: {}
        }
    })
    console.log('resultUseFind', resultUseFind)
    // let servicePathEntryList = []
    if (resultUseFind.items.value) {
        // servicePathEntryList = resultUseFind.items.value
        result[decapitalizeFirstLetter(modelClassName)] = {
            get: function () {
                // return servicePathEntryList
                return resultUseFind.items.value
            }
        }
    }
    // const servicePathName = decapitalizeFirstLetter(modelClassName)
    // let gcList = []
    // result[servicePathName] = {
    //     get: function () {
    //         return gcList
    //     }
    // }
    // const params = {
    //     query: {},
    //     paginate: false
    // }
    // ModelClass.find(params).then((resultFind) => {
    //     console.group('mapBindIDItems find.then')
    //     console.log('resultFind', resultFind)
    //     gcList = resultFind.data
    //     console.log('gcList', gcList)
    //     // if (gcList) {
    //     //     result[servicePathName] = {
    //     //         get: function () {
    //     //             return gcList
    //     //         }
    //     //     }
    //     // }
    //     console.groupEnd()
    // }).catch((error) => {
    //     console.error(error.message, error)
    // })

    // ------------------------------------------
    // entryNames setup
    console.log('entryNames', entryNames)
    for (var entryName of entryNames) {
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
        result[entryName] = {
            get: function () {
                return gcItemClone.value
            },
            set: function (val) {
                gcItemClone.value = val
                gcItemClone.commit()
                gcItem.patch({ data: { value: val } })
            }
        }
        console.groupEnd()
    }
    console.log('result', result)
    return result
// )
}

// ------------------------------------------
// usage:
// import { mapBindIDItems } from 'store/mapBindIDItems.js'
//
// export default {
//     name: 'ComponentName',
//     computed: {
//         ...mapBind('global-config', ['serialDevice', 'someOtherThing'])
//     },
// }
