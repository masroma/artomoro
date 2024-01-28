<template>
    <div class="bg-[#ff914d] py-10 hidden lg:block">
        <div class="max-w-6xl mx-auto flex items-center gap-x-96 mb-2">

            <p class="text-lg font-semibold text-white">
                Tentang Kami
            </p>
            <p class="text-lg font-semibold text-white">
                Pembayaran
            </p>
            <p class="text-lg font-semibold text-white">
                Lokasi Toko
            </p>
        </div>
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="tentang flex flex-col text-center">

                <img src="/logoartomoro.png" alt="" class="w-[250px]">
                <p class="text-white text-sm">
                    Artomoro frozen menjual berbagai macam <br />frozen food, bahan kue dan bumbu dapur
                </p>
            </div>

            <div class="paymentmethod">
                <div class="flex flex-col gap-y-2">
                    <div class="flex gap-2" v-for="m in metodepayment" :key="m.id">
                        <p class="text-sm text-white font-semibold">
                            {{ m.nama_metode }}&nbsp;{{ m.no_rekening }}&nbsp;{{ m.nama_pemilik_rekening }}
                        </p>
                    </div>


                </div>

            </div>

            <div class="tentang flex flex-col gap-y-2 ">


                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253776.9380398063!2d106.42733798671871!3d-6.3597815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e53e33de7e83%3A0xe4d9615b88fc6498!2sArtomoro%20Frozen%20Food!5e0!3m2!1sid!2sid!4v1706351148751!5m2!1sid!2sid"
                        width="260" height="160" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div class="flex gap-x-2 items-center">


                </div>





            </div>
        </div>
    </div>

    <div class="container mx-auto py-5 mt-5 lg:p-0 lg:hidden" v-if="$route.name !== 'detail_product' && $route.name !== 'cart' && $route.name !== 'checkout' &&  $route.name !== 'login' &&  $route.name !== 'register'">
        <footer class="bg-white text-gray-500 pb-1 pt-2 fixed shadow-md border  bottom-0 w-full">
            <div class="flex justify-around">
                <router-link :to="{name:'home'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path :fill="$route.name == 'home' ? '#ff914d' : '#999999'"
                            d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.223a1 1 0 0 1 1.228 0l8 6.223a1 1 0 0 1 .386.79zm-2-1V9.978l-7-5.444l-7 5.444V19z" />
                    </svg>
                    <p :class="$route.name == 'home' ? 'text-[#ff914d] text-[10px]' : 'text-[10px] text-gray-500'">Home</p>
                </router-link>
                <router-link :to="{name:'order'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path  :fill="$route.name == 'order' ? '#ff914d' : '#999999'" fill-rule="evenodd"
                            d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1M4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm2 5h2v2H6zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-3 4H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-2 3H6v2h2zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                            clip-rule="evenodd" />
                    </svg>
                    <p :class="$route.name == 'order' ? 'text-[#ff914d] text-[10px]' : 'text-[10px] text-gray-500'">Transaksi</p>
                </router-link>
                <a href="https://wa.me/6283890435839" target="_blank" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#999999"
                            d="M18.72 14.76c.35-.85.54-1.76.54-2.76c0-.72-.11-1.41-.3-2.05c-.65.15-1.33.23-2.04.23A9.07 9.07 0 0 1 9.5 6.34a9.21 9.21 0 0 1-4.73 4.88c-.04.25-.04.52-.04.78A7.27 7.27 0 0 0 12 19.27c1.05 0 2.06-.23 2.97-.64c.57 1.09.83 1.63.81 1.63c-1.64.55-2.91.82-3.78.82c-2.42 0-4.73-.95-6.43-2.66a9.03 9.03 0 0 1-2.24-3.69H2v-4.55h1.09a9.09 9.09 0 0 1 15.33-4.6a8.991 8.991 0 0 1 2.47 4.6H22v4.55h-.06L18.38 18l-5.3-.6v-1.67h4.83zm-9.45-2.99c.3 0 .59.12.8.34a1.136 1.136 0 0 1 0 1.6c-.21.21-.5.33-.8.33c-.63 0-1.14-.5-1.14-1.13c0-.63.51-1.14 1.14-1.14m5.45 0c.63 0 1.13.51 1.13 1.14c0 .63-.5 1.13-1.13 1.13c-.63 0-1.14-.5-1.14-1.13a1.14 1.14 0 0 1 1.14-1.14" />
                    </svg>
                    <p class="text-[10px] text-gray-500">Kontak CS</p>
                </a>
                <router-link :to="{name:'dashboard'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none"  :stroke="$route.name == 'dashboard' ? '#ff914d' : '#999999'"  stroke-dasharray="28" stroke-dashoffset="28" stroke-linecap="round"
                            stroke-width="2">
                            <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0" />
                            </path>
                            <path
                                d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s"
                                    values="28;0" />
                            </path>
                        </g>
                    </svg>
                    <p :class="$route.name == 'dashboard' ? 'text-[#ff914d] text-[10px]' : 'text-[10px] text-gray-500'">Akun</p>
                </router-link>
               
            </div>
        </footer>
    </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    name: 'FooterComponent',

    setup() {
       
        const store = useStore()
        onMounted(() => {
            store.dispatch('pembayaranlocal/getData')
        })

        const metodepayment = computed(() => {
            return store.getters['pembayaranlocal/getData']
        })

       

      

        return {
            metodepayment
        }
    }
}
</script>