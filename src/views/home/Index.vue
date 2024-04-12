<template>
    <HeaderHome />
    <div class="container max-w-xl mx-auto">
        <div class="mx-3 mt-5 mb-1 ">
            <p class="text-xl  font-semibold" v-if="user.name != ''">
                {{ user.name }} 
            </p>
        </div>
        <div class="flex mx-3  mb-5 bg-white shadow-md rounded-lg">
            <input type="text" placeholder="cari produk" @click="linkToSearch"
                class="flex-1  bg-white focus:outline-none py-4 px-2 rounded-lg">
            <button class="items-center bg-green-700 px-3 rounded-tr-lg rounded-br-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024">
                    <path fill="#ffffff"
                        d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704" />
                </svg>
            </button>
        </div>
        <CategoryComponent />
        <SliderComponent />




        <div class="container mx-auto py-2 px-2 pb-20">
            <div class="mb-5">
                <h2 class="text-lg font-semibold ">Produk</h2>
            </div>

            <div class="grid grid-cols-12 gap-x-3">

                <div v-for="product in products" :key="product.id" class="col-span-6 lg:col-span-4 xl:col-span-4 md:col-span-6 sm:col-span-6">
                    <div class="shadow-md border relative my-3 rounded-xl">
                        <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }">
                            <div class="w-full mb-5">
                                <img :src="product.image" class="mx-auto max-h-1/2 rounded-tr-xl rounded-tl-xl">
                            </div>
                        </router-link>
                        <div class=" pb-5 items-center ">

                            <div class="flex-col">
                                <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }">
                                    <p class="text-sm font-semibold capitalize px-1">{{ limitCharacters(product.title,
                14)
                                        }}</p>
                                </router-link>

                                <div class="flex justify-between items-center px-1">

                                    <p v-if="product.discount" class="text-[10px] text-gray-500"><s>Rp. {{
                moneyFormat(product.price) }}</s></p>



                                    <p class="font-semibold">
                                        Rp. {{ moneyFormat(calculateDiscount(product)) }}
                                    </p>

                                </div>
                                <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }">
                                    <p v-if="product.discount"
                                        class="absolute top-[10px] right-[10px] bg-[#ff914d] font-semibold text-[10px] text-white px-1 rounded">
                                        Diskon
                                        {{ product.discount }} %</p>
                                </router-link>
                            </div>
                            <div class="mt-2 mx-2">
                                <div @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                                    class="hover:cursor-pointer flex items-center rounded-lg bg-green-700 px-2 py-2 gap-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 512 512">
                                        <path fill="white"
                                            d="M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M176 144a80 80 0 0 1 160 0v16H176Z" />
                                    </svg>
                                    <p class="text-white text-sm font-semibold">Tambah</p>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>


            </div>

            <div v-if="nextExists" class="w-full text-center">
                <button @click="loadMore" class="bg-green-700 w-fit rounded  px-3 py-3 text-white font-semibold">Load
                    More</button>
            </div>

        </div>


    </div>

    <Footer />
</template>

<script>
import SliderComponent from '../../components/Slider.vue'
import CategoryComponent from '../../components/Category.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router' // vue router
import { useToast } from "vue-toastification"
import HeaderHome from '../../components/HeaderHome.vue'
import Footer from '../../components/Footer.vue'
export default {
    name: 'HomeComponent',

    components: {
        //customer menu component
        SliderComponent,
        CategoryComponent,
        HeaderHome,
        Footer
    },

    setup() {

        //store vuex
        const store = useStore()
        const toast = useToast()
        const router = useRouter()

        //onMounted akan menjalankan action "getProducts" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
            store.dispatch('auth/getUser')
            store.dispatch['auth/isLoggedIn']
            store.dispatch['auth/refreshToken']
        })

        function linkToSearch() {
        router.push({
          name: 'pencarian'
        })
      }

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const refreshtoken = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/refreshToken']
        })

        const limitCharacters = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...'; // Menambahkan ellipsis jika teks melebihi maxLength
            } else {
                return text;
            }
        };

        //computed properti digunakan untuk get data products dari state di module product 
        const products = computed(() => {
            return store.state.product.products
        })

        const nextExists = computed(() => {
            return store.state.product.nextExists
        })

        //get nextPage
        const nextPage = computed(() => {
            return store.state.product.nextPage
        })

        //loadMore function
        function loadMore() {
            store.dispatch('product/getLoadMore', nextPage.value)
        }

        const isLoggedIn = computed(() => {

            //get getter "isLoggedIn" dari module "auth"
            return store.getters['auth/isLoggedIn']

        })

        function addToCart(product_id, price, weight) {


            //check token terlebih dahulu
            // const token = store.state.auth.token
         

            if (!this.isLoggedIn) {
                return router.push({ name: 'login' })
            }

            //panggil action addToCart di module cart
            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1
            }).then((response) => {
                console.log('respone home',response)
                //redirect ke dashboard

                // router.push({ name: "cart" });
                store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                store.dispatch('cart/cartWeight')


                toast.success("Produk berhasil ditambahkan")
            })
                .catch((error) => {

                    store.dispatch('auth/refreshToken')
                    .then(() => {
                    // Jika refresh token berhasil, coba kembali menambahkan produk ke keranjang
                    // Panggil ulang fungsi addToCart dengan parameter yang sama
                        addToCart(product_id, price, weight);
                    }).catch(() => {
                    // Jika refresh token gagal, redirect ke halaman login
                        router.push({ name: 'login' });
                    });
                    // Untuk kesalahan lainnya, Anda dapat menampilkan pesan atau melakukan penanganan tambahan
                    console.log('errorbos',error.response.message);


                });

        }


        return {
            store,
            products,
            nextExists,     // <-- return nextExists,
            nextPage,       // <-- return nextPage
            loadMore,
            addToCart,
            user,
            limitCharacters,
            isLoggedIn,
            refreshtoken,
            linkToSearch
        }

    }

}
</script>