<template>
    <HeaderSecond :props="categories"/>
    <div class="container max-w-xl mx-auto py-2 px-2">
        <div class="flex mt-5 mb-5 bg-white shadow-md rounded-lg">
            <input type="text" placeholder="cari produk"
                class="flex-1  bg-white focus:outline-none py-4 px-2 rounded-lg">
            <button class="items-center bg-green-700 px-3 rounded-tr-lg rounded-br-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024">
                    <path fill="#ffffff"
                        d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704" />
                </svg>
            </button>
        </div>
        <div class="grid grid-cols-12 gap-x-3 pb-20">
            <div v-for="product in products" :key="product.id" class="col-span-6">
                <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }">
                        <div class="shadow-md border relative my-3 rounded-xl">
                            <div class="w-full mb-5">
                                <img :src="product.image" class="mx-auto max-h-1/2 rounded-tr-xl rounded-tl-xl">
                            </div>
                            <div class="flex pb-5 items-center ">
                                <div class="flex-1 flex-col">
                                    <p class="text-lg font-semibold capitalize px-3">{{ limitCharacters(product.title, 15)
                                        }}</p>
                                    <div class="flex justify-between items-center px-3">
                                        <p v-if="product.discount" class="text-[10px] text-gray-500"><s>Rp. {{
                    moneyFormat(product.price) }}</s></p>

                                        <p class="font-semibold">
                                            Rp. {{ moneyFormat(calculateDiscount(product)) }}
                                        </p>
                                    </div>
                                    <p v-if="product.discount"
                                        class="absolute top-[10px] right-[10px] bg-[#ff914d] font-semibold text-[10px] text-white px-1 rounded">
                                        Diskon
                                        {{ product.discount }} %</p>
                                </div>
                                <div class="flex px-3">
                                    <div  @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)" class="hover:cursor-pointer flex items-center rounded-full bg-green-700 px-2 py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="white" d="M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M176 144a80 80 0 0 1 160 0v16H176Z"/></svg>  
                                    </div>
                                </div>

                            
                            </div>
                        </div>
                    </router-link>
            </div>


        </div>


    </div>
    <Footer/>
</template>

<script>
import { computed, onMounted } from 'vue'   // computed dan onMounted
import { useStore } from 'vuex' // store Vuex
import { useRoute, useRouter } from 'vue-router' // vue router
import { useToast } from "vue-toastification"
import HeaderSecond from '../../components/HeaderSecond.vue'
import Footer from '../../components/Footer.vue'

export default {

    name: 'CategoryShowComponent',


    components: {
        HeaderSecond,
        Footer
    },

    setup() {

        //store vuex
        const store = useStore()

        const toast = useToast()
        //vue route
        const route = useRoute()
        const router = useRouter()

        //onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
        onMounted(() => {
            store.dispatch('category/getDetailCategory', route.params.slug)
            store.dispatch('category/getProductInCategory', route.params.slug)
        })

        //computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category" 
        const products = computed(() => {
            return store.state.category.productInCategory
        })

        const categories = computed(() => {
            return store.state.category.category
        })

        const limitCharacters = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...'; // Menambahkan ellipsis jika teks melebihi maxLength
            } else {
                return text;
            }
        };

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
            store,
            route,
            products,
            categories,
            addToCart,
            limitCharacters
        }

    }

}
</script>