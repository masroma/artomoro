<template>
    <div class="max-w-6xl mx-auto flex flex-col gap-y-5">
        <div class="my-10">
            <!-- {{  products }} -->
            <div class="flex flex-col gap-y-10">
                <div class="flex gap-x-2">
                    <router-link class="text-sm text-gray-500" :to="{ name: 'home' }">Home</router-link>
                    <span class="text-sm text-gray-500"> > </span>
                    <router-link class="text-sm text-[#ff914d]"
                        :to="{ name: 'detail_product', params: { slug: products.slug } }">{{ products.title }}</router-link>
                </div>

                <div class="flex gap-x-5">
                    <img :src="products.image" class="w-1/4" alt="">

                    <div class="px-5 py-3 w-full">
                        <h5 class="text-xl font-semibold text-gray-500 capitalize">
                            {{ products.title }}
                        </h5>
                        <div class="flex gap-x-3 items-center">

                            <p class="text-md font-semibold text-[#ff914d]">
                                Rp. {{ moneyFormat(calculateDiscount(products)) }}
                            </p>

                            <p v-if="products.discount" class="text-xs text-gray-500"><s>Rp. {{
                                moneyFormat(products.price) }}</s></p>
                        </div>




                        <table class=" mt-5">
                            <tr>
                                <td>
                                    <p class="text-gray-500 text-sm">Diskon</p>
                                </td>
                                <td class="px-5">:</td>
                                <td>
                                    <p v-if="products.discount" class="text-center border-[1px] border-[#ff914d] font-semibold text-[#ff914d]
                                px-1 py-1 rounded">
                                        {{ products.discount }} %
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="text-gray-500 text-sm">Berat</p>
                                </td>
                                <td class="px-5">:</td>
                                <td class="px-5">
                                    <p class="text-gray-500 text-sm">{{ products.weight }} Gram</p>
                                </td>
                            </tr>
                        </table>

                        <button @click.prevent="addToCart(products.id, calculateDiscount(products), products.weight)" class="my-10 w-1/4 text-center bg-[#ff914d] font-semibold text-[11px] text-white 
                    px-1 py-2 rounded">Beli Sekarang</button>

                        <h5 class="text-xl font-semibold text-gray-500 capitalize border-b-2  pb-1">
                            Deskripsi Produk
                        </h5>

                        <div class="mt-3 text-gray-500 text-sm" v-html="products.content"></div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
 


<script>
import { computed, onMounted } from 'vue'   // computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute, useRouter } from 'vue-router' // vue router
import { useToast } from "vue-toastification"


export default {

    name: 'ProductShowComponent',

    setup() {

        //vue route
        const route = useRoute()

        const toast = useToast()

        //vue router
        const router = useRouter()

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action "getDetailProduct" di module "product" Vuex
        onMounted(() => {
            store.dispatch('product/getDetailProduct', route.params.slug)
        })

        //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "product" Vuex 
        const products = computed(() => {
            return store.state.product.product
        })

        function addToCart(product_id, price, weight) {

            //check token terlebih dahulu
            const token = store.state.auth.token

            if (!token) {
                return router.push({ name: 'login' })
            }

            //panggil action addToCart di module cart
            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1
            }).then(() => {
                //redirect ke dashboard

                // router.push({ name: "cart" });
                store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                store.dispatch('cart/cartWeight')


                toast.success("Produk berhasil ditambahkan")
            })
                .catch((error) => {
                    //show validaation message
                    console.log(error);


                });

        }

        return {
            addToCart,
            route,
            router,
            store,
            products,
        }

    }

}
</script>