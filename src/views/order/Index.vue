<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5">
        <CustomerMenu class="w-36 border-r" />
        <div class="content flex-1">
            <h1 class="text-lg font-semibold">
                Order
            </h1>

            <div class="w-full my-5">
                <table class="w-full table-auto border-2 bg-gray-100 h-10">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">INVOICE</th>
                            <th scope="col">FULL NAME</th>
                            <th scope="col">SHIPPING</th>
                            <th scope="col">GRAND TOTAL</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id">
                            <th>{{ order.invoice }}</th>
                            <td>{{ order.name }}</td>
                            <td>{{ order.courier.toUpperCase() }} | {{ order.service }} | Rp. {{
                                moneyFormat(order.cost_courier) }}</td>
                            <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                            <td class="text-center">
                                <router-link :to="{ name: 'detail_order', params: { snap_token: order.snap_token } }"
                                    class="btn btn-sm btn-primary">DETAIL</router-link>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
//import customer menu component
import CustomerMenu from '../../components/Menu.vue'
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

    name: 'OrderComponent',

    components: {
        //customer menu component
        CustomerMenu
    },

    setup() {

        //store vuex
        const store = useStore()

        //mounted
        onMounted(() => {
            store.dispatch('order/getOrder')
            store.dispatch('auth/getUser')
        })

        //computed
      

        const orders = computed(() => {

            //panggil getter dengan nama "getOrder" di module "order" vuex 
            return store.getters['order/getOrder']

        })

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

       
     

        //return a state and function
        return {
            store,
            orders,
            user
        }

    }

}
</script>