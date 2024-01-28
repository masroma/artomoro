<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5 hidden lg:block">
        <CustomerMenu class="w-36 border-r" />
        <div class="content flex-1">
            <h1 class="text-lg font-semibold">
                Order
            </h1>

            <div class="w-full my-5">
                <table class="w-full border-2 bg-gray-100">
                    <thead class="bg-orange-500 text-white">
                        <tr>
                            <th scope="col" class="py-2  text-[11px]">INVOICE</th>
                            <th scope="col" class="py-2  text-[11px]">FULL NAME</th>
                            <th scope="col" class="py-2  text-[11px]">SHIPPING</th>
                            <th scope="col" class="py-2  text-[11px]">GRAND TOTAL</th>
                            <th scope="col" class="py-2  text-[11px]">Status</th>
                            <th scope="col" class="py-2  text-[11px]">Payment</th>
                            <th scope="col" class="py-2  text-[11px]">Pengiriman</th>
                            <th scope="col" class="py-2  text-[11px]">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-200">
                            <td class="py-2 text-[11px]">{{ order.invoice }}</td>
                            <td class="py-2  text-[11px]">{{ order.name }}</td>
                            <td class="py-2  text-[11px]">{{ order.courier.toUpperCase() }} | {{ order.service }} | Rp. {{
                                moneyFormat(order.cost_courier) }}</td>
                            <td class="py-2  text-[11px]">Rp. {{ moneyFormat(order.grand_total) }}</td>
                            <td class="py-2 text-center  text-[11px]">
                                {{ order.status }}
                            </td>
                            <td class="py-2 text-center  text-[11px]">
                                {{ order.payment ? order.payment.nama_metode : '' }}
                                {{ order.payment ? order.payment.no_rekening : '' }}
                                {{ order.payment ? order.payment.nama_pemilik_rekening : '' }}
                            </td>
                            <td class="py-2 text-center  text-[11px]">
                                {{ order.status_pengiriman ?? 'Menunggu pembayaran' }}
                            </td>
                            <td class="py-2 text-center  text-[11px]">
                                <button @click="openModal(order)"
                                    class="text-[11px] inline-block px-2 py-2  text-white bg-orange-500 rounded focus:outline-none focus:shadow-outline-blue">
                                    <i class="fa fa-eye"></i>
                                </button>
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
                                    <td>{{ r.product_name }}</td>
                                    <td>{{ r.price }}</td>
                                    <td>{{ r.qty }}</td>
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

    <div class="container mx-auto py-2 px-2 lg:p-0 lg:hidden">
        <h2 class="text-sm font-semibold text-gray-500">Dashboard
        </h2>
        <div class="flex gap-x-2 mb-3">
            <router-link class="text-[11px] text-gray-500" :to="{ name: 'home' }">Home</router-link>
            <span class="text-[11px] text-gray-500"> > </span>
            <router-link class="text-[11px] text-[#ff914d]" :to="{ name: 'order' }">Order</router-link>
        </div>

        <div v-for="order in orders" :key="order.id">
            <div class="flex flex-col w-full shadow border-[1px] px-2 py-2 gap-y-4 my-2 rounded">
                <div class="flex justify-between">
                    <p class="text-[11px]">
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
                        {{ order.status }}
                    </p>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <p class="text-[10px] text-gray-500">No Invoice</p>
                        <p class="text-[12px] text-gray-500 font-semibold">
                            {{ order.invoice }}
                        </p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-[10px] text-gray-500">Total Transaksi</p>
                        <p class="text-[12px] text-gray-500 font-semibold">
                            Rp. {{ moneyFormat(order.grand_total) }}
                        </p>
                    </div>
                </div>

                <div class="flex justify-between">
                    <div>
                        <a class="bg-[#ff914d] text-white text-[11px] w-fit px-2 py-1 rounded"
                            href="https://wa.me/6283117907091" target="_blank"
                            v-if="order.paymentlocal_id != 3 && order.status != 'success'">Konfirmasi Pembayaran</a>
                        <a class="bg-gray-700 text-white text-[11px] w-fit px-2 py-1 rounded"
                            href="https://wa.me/6283117907091" target="_blank"
                            v-else>Menunggu
                            Pengiriman</a>
                    </div>

                   <div class="div">
                    <button @click="openModal(order)"
                    class="text-[11px] inline-block px-1 py-1  text-white bg-orange-500 rounded focus:outline-none focus:shadow-outline-blue">
                    <i class="fa fa-eye"></i>
                </button>
                   </div>
                </div>
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
                                    class="text-[11px] inline-block px-4 py-1 text-white bg-orange-500 rounded focus:outline-none ">Close</button>
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
import { ref, computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import moment from 'moment';

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