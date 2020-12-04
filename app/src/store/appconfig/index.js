
export default {
    namespaced: true,
    state: {
        globalMessage: 'Hello Sun',
        package_selected: 'car',
        package_options: [
            {
                label: 'boat',
                value: 'boat',
                icon: 'directions_boat'
            },
            {
                label: 'car',
                value: 'car',
                icon: 'directions_car'
            },
            {
                label: 'railway',
                value: 'railway',
                icon: 'directions_railway'
            }
        ]
    },
    getters: {
        getFromServer: function (context) {
            console.log('TODO: Implement getter getFromServer.')
        }
    },
    mutations: {
        setGlobalMessage: function (state, value) {
            state.globalMessage = value
        }
    },
    actions: {
        getFromServer: function (context) {
            console.log('TODO: Implement action getFromServer.')
        }
    }
}
