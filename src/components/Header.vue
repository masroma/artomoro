<template>
    <div class="py-3">
        <div class="max-w-6xl mx-auto flex justify-between">
            <p class="text-[12px] text-gray-500 font-semibold">Pengiriman dari Gunung Sindur, Kab.Bogor</p>

            <div class="flex gap-x-2">
              
                <div class="flex gap-x-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#ff914d"
                            d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317" />
                    </svg>

                    <a href="https://wa.me/6283890435839" target="_blank" class="text-[12px] text-gray-500 font-semibold">Kontak CS</a>

                </div>
            </div>
        </div>
    </div>

    <div class="max-w-6xl mx-auto flex items-center h-24 justify-between ">
        <router-link :to="{ name: 'home' }">
            <img src="/logoartomoro.png" alt="" class="w-[200px] h-[60px]">
        </router-link>


        <div class="flex flex-col">
            <div class="pencarian w-[500px] h-[48px] items-center bg-gray-100 rounded-md flex px-3 gap-x-2">
                <button class="items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                        <path fill="#666"
                            d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704" />
                    </svg>
                </button>
                <input type="text" placeholder="cari produk" class="h-[44px] w-full bg-gray-100 focus:outline-none">
            </div>
            <div class="flex gap-x-2 py-1">

                <div class="text-sm text-gray-400 font-semibold">sosis ayam</div>

                <div class="text-sm text-gray-400 font-semibold">sosis sapi</div>

                <div class="text-sm text-gray-400 font-semibold">ayam sekilo</div>

                <div class="text-sm text-gray-400 font-semibold">dumpling</div>

                <div class="text-sm text-gray-400 font-semibold">jamur enoki</div>

            </div>
        </div>


        <div class="akundancart flex gap-x-3">



            <router-link v-if="user.name" :to="{ name: 'dashboard' }"
                class="flex gap-x-2 items-center border-r-2 border-gray-300 px-3">
                <p class="text-base text-gray-500 ">{{ user.name }}</p>
            </router-link>

            <router-link v-else :to="{ name: 'login' }" class="flex gap-x-2 items-center border-r-2 border-gray-300 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                    <path fill="#ff914d"
                        d="M512 512a192 192 0 1 0 0-384a192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0" />
                </svg>

                <p class="text-base text-gray-500 ">Login</p>
            </router-link>


            <div class="flex gap-x-2 items-center  ">
               

                <router-link :to="{name: 'cart'}" v-if="cartCount != 0 && user.name" class="text-base text-gray-500 ">{{ cartCount }} | Rp. {{ moneyFormat(cartTotal) }}
                </router-link>
                <router-link :to="{name: 'cart'}" v-else class="text-base text-gray-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#ff914d"
                            d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z" />
                    </svg>    
                </router-link>
            </div>


        </div>
    </div>

    <div class="max-w-6xl mx-auto flex gap-x-2">

    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'HeaderComponent',

    setup() {

        //store vuex
        const store = useStore()

        const isLoggedIn = computed(() => {

            //get getter "isLoggedIn" dari module "auth"
            return store.getters['auth/isLoggedIn']

        })

        //cart count
        const cartCount = computed(() => {

            //get getter "cartCount" dari module "auth"
            return store.getters['cart/cartCount']
        })

        //cart total
        const cartTotal = computed(() => {

            //get getter "cartTotal" dari module "auth"
            return store.getters['cart/cartTotal']
        })


        


        //mounted
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

            const token = store.state.auth.token

            if (!token) {
                return
            }

            //saat mounted, akan memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartCount')

            //saat mounted, akan memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartTotal')


        })

        //computed
        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        //return a state and function
        return {
            store,
            user,
            isLoggedIn,
            cartTotal,
            cartCount
        }

    }
}
</script>