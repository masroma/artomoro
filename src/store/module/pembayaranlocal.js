//import global API
import Api from '../../api/Api'

const pembayaranlocal = {

    //set namespace true
    namespaced: true,

    //state
    state: {

        //index slider
        datas: []
    
    },

    //mutations
    mutations: {

        //set state sliders dengan data dari response 
        GET_DATA(state, datas) {
            state.datas = datas
        } 

    },

    //actions
    actions: {

        //action getSliders
        getData({ commit }) {

            //get data sliders ke server
            Api.get('/metodepembayaran')
            .then(response => {
                console.log(response.data.data)
                //commit ke mutation GET_SLIDERS dengan response data
                commit('GET_DATA', response.data.data)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        }

    },

    //getters
    getters: {
        getData(state) {
            return state.datas
        },

    }

}

export default pembayaranlocal