<template>
    <HeaderSecond :props="products" />
    <div class="container max-w-xl mx-auto py-5 pb-20 px-2 relative">


        <img :src="products.image" class="w-2/3 mx-auto my-5 rounded-lg" :alt="products.title">

        <h5 class="text-xl font-semibold capitalize">
            {{ products.title }}
        </h5>
        <div class="flex gap-x-3 items-center">
            <p class="font-semibold">
                Rp. {{ moneyFormat(calculateDiscount(products)) }}
            </p>

            <p v-if="products.discount"><s>Rp. {{
        moneyFormat(products.price) }}</s></p>
        </div>

        <table class=" mt-5">
            <tr v-if="products.discount">
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
                    <p>Berat</p>
                </td>
                <td class="px-5">:</td>
                <td class="px-5">
                    <p class="font-semibold">{{ products.weight }} Gram</p>
                </td>
            </tr>
        </table>

        <h5 class="mt-5 text-lg font-bold capitalize">
            Deskripsi Produk
        </h5>

        <div class="mt-2" v-html="products.content"></div>






    </div>

    <div class="px-3 w-full mx-auto py-3 sticky bottom-0 z-50 bg-white">
        <footer class="max-w-xl mx-auto">
            <button @click.prevent="addToCart(products.id, calculateDiscount(products), products.weight)" class="w-full text-center py-3 bg-green-600 font-semibold 
         text-white 
         rounded">Beli Sekarang</button>
        </footer>
    </div>


</template>



<script>
import { computed, onMounted } from 'vue'   // computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute, useRouter } from 'vue-router' // vue router
import { useToast } from "vue-toastification"
import HeaderSecond from '../../components/HeaderSecond.vue'


export default {

    name: 'ProductShowComponent',
    components: {
        HeaderSecond
    },

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