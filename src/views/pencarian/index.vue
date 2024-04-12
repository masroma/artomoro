<template>
    <HeaderSecond props="pencarian" />
    <div class="mx-auto max-w-xl flex mx-3 mt-5 mb-5 bg-white shadow-md rounded-lg">
        <input type="text" placeholder="cari produk" v-model="data.search" @keyup="searchQuery"
            class="flex-1  bg-white focus:outline-none py-4 px-2 rounded-lg">
        <button class="items-center bg-green-700 px-3 rounded-tr-lg rounded-br-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024">
                <path fill="#ffffff"
                    d="m795.904 750.72l124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704a352 352 0 0 0 0 704" />
            </svg>
        </button>
    </div>



    <div class="mx-auto max-w-xl grid grid-cols-12 gap-x-3 pb-20">
        <div v-for="product in products" :key="product.id"
            class="col-span-6 lg:col-span-4 xl:col-span-4 md:col-span-6 sm:col-span-6">
            <router-link :to="{ name: 'detail_product', params: { slug: product.slug } }">
                <div class="shadow-md border relative my-3 rounded-xl">
                    <div class="w-full mb-5">
                        <img :src="product.image" class="mx-auto max-h-1/2 rounded-tr-xl rounded-tl-xl">
                    </div>
                    <div class="pb-5 items-center ">
                        <div class="flex-col">
                            <p class="text-sm font-semibold capitalize px-1">{{ limitCharacters(product.title, 15)
                                }}</p>
                            <div class="flex justify-between items-center px-1">
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
                        <div class="mt-2 mx-2">
                            <div @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                                class="hover:cursor-pointer flex items-center rounded-lg bg-green-700 px-2 py-2 gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
                                    <path fill="white"
                                        d="M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M176 144a80 80 0 0 1 160 0v16H176Z" />
                                </svg>
                                <p class="text-white text-sm font-semibold">Tambah</p>
                            </div>
                        </div>


                    </div>
                </div>
            </router-link>
        </div>


    </div>
    <Footer />
</template>

<script>
import HeaderSecond from '../../components/HeaderSecond.vue'
import Footer from '../../components/Footer.vue'
import { computed, onMounted,  reactive } from 'vue'
import { useStore } from 'vuex'

export default {

    name: 'PencarianComponent',


    components: {
        HeaderSecond,
        Footer
    },

    setup() {

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action "getProducts" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
        })

        const data = reactive({
            // currentPage: 1,
            perPage:100,
            search:''
            
            });


        const products = computed(() => {
            return store.state.product.products
        })

        const limitCharacters = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...'; // Menambahkan ellipsis jika teks melebihi maxLength
            } else {
                return text;
            }
        };

        const searchQuery = async () => {
            
            await store.dispatch("product/getProducts", data.search);
        };

        return {
            store,
            data,
            products,
            limitCharacters,
            searchQuery

        }

    }



}

</script>