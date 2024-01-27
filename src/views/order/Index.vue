<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5">
        <CustomerMenu class="w-36 border-r" />
        <div class="content flex-1">
            <h1 class="text-lg font-semibold">
                Order
            </h1>

            <div class="w-full my-5">
                <table class="w-full border-2 bg-gray-100">
                    <thead class="bg-orange-500 text-white">
                        <tr>
                            <th scope="col" class="py-2">INVOICE</th>
                            <th scope="col" class="py-2">FULL NAME</th>
                            <th scope="col" class="py-2">SHIPPING</th>
                            <th scope="col" class="py-2">GRAND TOTAL</th>
                            <th scope="col" class="py-2">Status</th>
                            <th scope="col" class="py-2">Pengiriman</th>
                            <th scope="col" class="py-2">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-200">
                            <td class="py-2 text-sm">{{ order.invoice }}</td>
                            <td class="py-2">{{ order.name }}</td>
                            <td class="py-2">{{ order.courier.toUpperCase() }} | {{ order.service }} | Rp. {{
                                moneyFormat(order.cost_courier) }}</td>
                            <td class="py-2">Rp. {{ moneyFormat(order.grand_total) }}</td>
                            <td class="py-2 text-center">
                                {{ order.status }}
                            </td>
                            <td class="py-2 text-center">
                                {{ order.status_pengiriman ?? 'Menunggu pembayaran' }}
                            </td>
                            <td class="py-2 text-center">
                                <button @click="openModal(order)"
                                    class="inline-block px-4 py-2 leading-5 text-sm text-white bg-orange-500 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Detail</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <!-- modal -->
        <div v-if="selectedOrder" class="fixed inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <!-- Modal Content -->
                <div v-if="selectedOrder"
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-orange-500 text-white px-4 py-2">
                        <h3 class="text-lg font-semibold">Order Details - {{ selectedOrder.invoice }}</h3>
                    </div>
                    <div class="p-4">

                        <table class="w-3/4">
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>:</td>
                                <td>{{ selectedOrder.name }}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>:</td>
                                <td>{{ selectedOrder.courier.toUpperCase() }} | {{ selectedOrder.service }} | Rp. {{
                                    moneyFormat(selectedOrder.cost_courier) }}</td>
                            </tr>
                            <tr>
                                <td>Grand Total</td>
                                <td>:</td>
                                <td>Rp. {{ moneyFormat(selectedOrder.grand_total) }}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>:</td>
                                <td>{{ selectedOrder.status }}</td>
                            </tr>
                            <tr>
                                <td>Status Pengiriman</td>
                                <td>:</td>
                                <td>{{ selectedOrder.status_pengiriman ?? 'Menunggu pembayaran' }}</td>
                            </tr>
                            
                        </table>

                        <table class="w-full mt-10">
                            <thead>
                                <tr>
                                    <th>Gambar</th>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="r in selectedOrder.orders" :key="r.id">
                                    <td><img :src="r.image" alt=""></td>
                                    <td>{{r.product_name}}</td>
                                    <td>{{r.price}}</td>
                                    <td>{{r.qty}}</td>
                                </tr>
                            </tbody>
                        </table>
                     
                    </div>
                    <div class="bg-white-500 text-white px-4 py-2">
                        <button @click="closeModal"
                            class="inline-block px-4 py-2 leading-5 text-sm text-white bg-orange-500 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal -->
    </div>
</template>

<script>
//import customer menu component
import CustomerMenu from '../../components/Menu.vue'
import { ref,computed, onMounted, reactive } from 'vue'
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

        const selectedOrder = ref(null);

        const openModal = (order) => {
           
            selectedOrder.value = order;
        };

        const closeModal = () => {
            selectedOrder.value = null;
        };




        //return a state and function
        return {
            store,
            orders,
            user,
            selectedOrder,
            openModal,
            closeModal
        }

    }

}
</script>