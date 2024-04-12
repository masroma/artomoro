//import global API
import Api from '../../api/Api'

const product = {

    //set namespace true
    namespaced: true,

    //state
    state: {
    
        //index products
        products: [],
        searchproduct :[],
        product: {},
        nextExists: false,
        nextPage: 0,

    },

    //mutations
    mutations: {

        //set state products dengan data dari response 
        GET_PRODUCTS(state, products) {
            state.products = products
        },

        SET_PRODUCTS(state, searchproduct) {
            state.searchproduct = searchproduct
        },

        SET_NEXTEXISTS(state, nextExists) {
            state.nextExists = nextExists
        },

        //set state nextPage
        SET_NEXTPAGE(state, nextPage) {
            state.nextPage = nextPage
        },

        SET_LOADMORE(state, data) {
            data.forEach(row => {
                state.products.push(row);
            });
        },

        DETAIL_PRODUCT(state, product) {
            state.product = product
        }

    },

    //actions
    actions: {

        getProducts({ commit }, payload) {
           
            let pencarian = payload ?? ''
            //get data campaign ke server
            Api.get(`/products?q=${pencarian}`)
            .then(response => {

                //commit ke mutation SET_CAMPAIGNS dengan response data
                commit('GET_PRODUCTS', response.data.products.data)

                if (response.data.products.current_page < response.data.products.last_page) {
                    
                    //commit ke mutation SET_NEXTEXISTS dengan true
                    commit('SET_NEXTEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', response.data.products.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTEXISTS dengan false
                    commit('SET_NEXTEXISTS', false)
                }

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        searchProducts({ commit }, querySearch='') {

            //get data token dan user
            const token = localStorage.getItem('token')

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            //get data campaign ke server
            Api.get(`/products?q=${querySearch}`)
            .then(response => {
                console.log('data',response.data.products.data)
                //commit ke mutation SET_CAMPAIGNS dengan response data
                commit('SET_PRODUCTS', response.data.products.data)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },


        getLoadMore({ commit }, nextPage) {

            //get data campaign dengan page ke server
            Api.get(`/products?page=${nextPage}`)
            .then(response => {

                //commit ke mutation SET_LOADMORE dengan response data
                commit('SET_LOADMORE', response.data.products.data)

                //console.log(response.data.data.data)

                if (response.data.products.current_page < response.data.products.last_page) {
                    
                    //commit ke mutation SET_NEXTEXISTS dengan true
                    commit('SET_NEXTEXISTS', true)
                    
                    //commit ke mutation SET_NEXTPAGE dengan current page + 1
                    commit('SET_NEXTPAGE', response.data.products.current_page + 1)

                } else {

                    //commit ke mutation SET_NEXTEXISTS dengan false
                    commit('SET_NEXTEXISTS', false)
                }

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        },

        getDetailProduct({ commit }, slug) {

            //get data sliders ke server
            Api.get(`/product/${slug}`)
            .then(response => {

                //commit ke mutation GET_PRODUCTS dengan response data
                commit('DETAIL_PRODUCT', response.data.product)

            }).catch(error => {

                //show error log dari response
                console.log(error)

            })
        }

        //action getProducts
       

    },

    //getters
    getters: {
        getData(state) {
            return state.products
        },
    }

}

export default product