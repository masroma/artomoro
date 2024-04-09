<template>
  <HeaderSecond props="Order" />
    <div class="container max-w-xl mx-auto py-5 pb-20 px-2 relative">
       
        <div v-for="order in orders" :key="order.id">
            <div class="flex flex-col w-full bg-white shadow border-[1px] px-2 py-3 gap-y-4 my-2 rounded">
                <div class="flex justify-between">
                    <p class="text-sm">
                        {{
                            new Date(order.created_at).toLocaleString("id-ID", {
                                timeZone: 'Asia/Jakarta',
                                hourCycle: "h23",
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })
                        }}
                    </p>

                    <p class="px-2 py-1 text-xs capitalize
                    bg-orange-100 text-orange-500
                    {{ order.status === 'success' ? 'bg-green-100 text-green-500' : '' }}
                    {{ order.status === 'failed' ? 'bg-red-100 text-red-500' : '' }}
                    {{ order.status === 'expired' ? 'bg-black text-white' : '' }}">
                     Pembayaran   {{ order.status }} / COD
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <p class="text-gray-500">No Invoice</p>
                        <p class="text-gray-500 font-semibold">
                            {{ order.invoice }}
                        </p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-gray-500">Total Transaksi</p>
                        <p class="text-end text-gray-500 font-semibold">
                            Rp. {{ moneyFormat(order.grand_total) }}
                        </p>
                    </div>
                </div>

                <div class="flex justify-between">
                    <div>
                        <a class="bg-[#ff914d] text-white  w-fit px-2 py-1 rounded"
                            href="https://wa.me/6283117907091" target="_blank"
                            v-if="order.paymentlocal_id != 3 && order.status != 'success'">Konfirmasi Pembayaran</a>
                        <a class="bg-gray-700 text-white  w-fit px-2 py-1 rounded"
                            href="https://wa.me/6283117907091" target="_blank"
                            v-else>Menunggu
                            Pengiriman</a>
                    </div>

                   <div class="div">
                    <button @click="openModal(order)"
                    class=" inline-block px-2 py-1  text-white bg-green-700 rounded focus:outline-none focus:shadow-outline-blue">
                    <i class="fa fa-eye"></i>
                </button>
                   </div>
                </div>
            </div>
        </div>

                <!-- modal -->
                <div v-if="selectedOrder" class="fixed inset-0 overflow-y-auto my-10">
                    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
        
                        <!-- Modal Content -->
                        <div v-if="selectedOrder"
                            class="pb-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div class="bg-green-700 text-white px-4 py-3">
                                <h3 class="text-sm font-semibold">Order Details - {{ selectedOrder.invoice }}</h3>
                            </div>
                            <div class="p-4">
        
                                <table class="w-full">
                                    <tr>
                                        <td class="text-[12px]">Nama Lengkap</td>
                                        <td class="text-[12px]">:</td>
                                        <td class="text-[12px]">{{ selectedOrder.name }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[12px]">Shipping</td>
                                        <td class="text-[12px]">:</td>
                                        <td class="text-[12px]">{{ selectedOrder.courier.toUpperCase() }} | {{ selectedOrder.service }} | Rp. {{
                                            moneyFormat(selectedOrder.cost_courier) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[12px]">Grand Total</td>
                                        <td class="text-[12px]">:</td>
                                        <td class="text-[12px]">Rp. {{ moneyFormat(selectedOrder.grand_total) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[12px]">Status</td>
                                        <td class="text-[12px]">:</td>
                                        <td class="text-[12px]">{{ selectedOrder.status }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-[12px]">Status Pengiriman</td>
                                        <td class="text-[12px]">:</td>
                                        <td class="text-[12px]">{{ selectedOrder.status_pengiriman ?? 'Menunggu pembayaran' }}</td>
                                    </tr>
        
                                </table>
        
                                <table class="w-full mt-10">
                                    <thead>
                                        <tr>
                                            <th class="text-[12px]">Gambar</th>
                                            <th class="text-[12px]">Nama Produk</th>
                                            <th class="text-[12px]">Harga</th>
                                            <th class="text-[12px]">Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="r in selectedOrder.orders" :key="r.id">
                                            <td class="w-1/2"><img :src="r.image" class="w-1/2"></td>
                                            <td class="text-[12px]">{{ r.product_name }}</td>
                                            <td class="text-[12px]">{{ r.price }}</td>
                                            <td class="text-[12px]">{{ r.qty }}</td>
                                        </tr>
                                    </tbody>
                                </table>
        
                            </div>
                            <div class="bg-white-500 text-white px-4 py-2">
                                <button @click="closeModal"
                                    class=" inline-block px-4 py-1 text-white bg-red-500 rounded focus:outline-none ">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- modal -->

    </div>
    <Footer/>
</template>

<script>
//import customer menu component
import { ref, computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import HeaderSecond from '../../components/HeaderSecond.vue'
import Footer from '../../components/Footer.vue'
export default {

    name: 'OrderComponent',
   
    components: {
        HeaderSecond,
        Footer
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