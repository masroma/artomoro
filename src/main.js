import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import router from './router'
import store from './store'
const app = createApp(App)
app.use(Toast)
app.use(router)
app.use(store)

//define mixins for global function
app.mixin({

    methods: {

        //money thousands
        moneyFormat(number) {
             let val = (number/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        }

        

    }
})

app.mount('#app')