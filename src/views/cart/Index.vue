<template>
    <div class="max-w-6xl mx-auto flex flex-col gap-y-5">
        <div class="my-10">
            <!-- {{  products }} -->
            <div class="flex flex-col gap-y-8">
                <div class="flex gap-x-2">
                    <router-link class="text-sm text-gray-500" :to="{ name: 'home' }">Home</router-link>
                    <span class="text-sm text-gray-500"> > </span>
                    <router-link class="text-sm text-[#ff914d]" :to="{ name: 'cart' }">Keranjang Belanja</router-link>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="flex flex-col gap-y-2 col-span-9">
                        <div v-for="cart in carts" :key="cart.id"
                            class="flex gap-3 shadow-md border py-3 px-3 justify-between">
                            <div class="flex gap-x-3">
                                <div class="w-24">
                                    <img :src="cart.product.image" class="w-full border-r-2">
                                </div>
                                <div class="flex flex-col gap-y-2">
                                    <p class="capitalize text-md text-gray-500 font-semibold">
                                        {{ cart.product.title }}
                                    </p>
                                    <div class="flex gap-x-1">
                                        <button class="bg-[#ff914d] font-semibold text-white rounded 
                                    px-2 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24">
                                                <path fill="white"
                                                    d="M18 10h-4V6a2 2 0 0 0-4 0l.071 4H6a2 2 0 0 0 0 4l4.071-.071L10 18a2 2 0 0 0 4 0v-4.071L18 14a2 2 0 0 0 0-4" />
                                            </svg></button>
                                        <input v-model="cart.quantity" type="number" min="1"
                                            class="appearance-none text-gray-500 text-center justify-center w-14 border-2 border-gray-300 rounded">
                                        <button class="bg-[#ff914d] font-semibold text-white rounded 
                                    px-2 justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                viewBox="0 0 24 24">
                                                <path fill="white" d="M18 11H6a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4" />
                                            </svg></button>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-x-5">
                                <div class="flex flex-col justify-center">
                                    <p class="text-xs text-gray-500">Qty {{ cart.quantity }} x Rp
                                        {{ moneyFormat(cart.product.price) }}</p>
                                    <p class="text-lg text-gray-500 font-semibold">
                                        Rp {{ moneyFormat(cart.product.price * cart.quantity) }}
                                    </p>
                                </div>
                                <div class="flex flex-col justify-center">
                                    <button class="bg-red-500 py-2 font-semibold text-white rounded 
                                px-2 justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <path fill="white"
                                                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 col-span-3  shadow-md border py-3 px-3">
                        <h5 class="text-gray-500 font-semibold">Rincian Belanja</h5>
                        <div class="flex justify-between">
                            <p class="font-semibold text-gray-500">Total Belanja</p>
                            <p>Rp {{ moneyFormat(cartTotal) }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="font-semibold text-gray-500">Total Berat</p>
                            <p>{{ cartWeight }} Gram</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex' // <-- vuex

export default {

    name: 'CartComponent',

    setup() {

        //store vuex
        const store = useStore()

        //mounted cart
        onMounted(() => {

            //menjalankan beberapa actions di module cart
            store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartWeight') // <-- untuk memanggil action "cartWeight" di module "cart"

        })

        //get data cart dari getters cart di module cart
        const carts = computed(() => {
            return store.getters['cart/getCart']
        })

        //get total cart dari state cartTotal di module cart
        const cartTotal = computed(() => {
            return store.state.cart.cartTotal
        })

        //get cart weight dari state cartWeight di module cart
        const cartWeight = computed(() => {
            return store.state.cart.cartWeight
        })


        return {
            carts,              // <-- state carts
            cartTotal,          // <-- state cartTotal
            cartWeight,         // <-- state cartWeight
        }

    }

}
</script>

<style>
/* Gaya untuk menghilangkan tombol panah di input type number */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>