<template>
    <div class="max-w-6xl mx-auto">
        <SliderComponent />
        <CategoryComponent />

        <div class="my-10 flex flex-col gap-y-10 hidden lg:block">
            <div class="border-b-2  border-[#ff914d] w-fit pb-1">
                <h2 class="text-xl font-semibold text-gray-500">Semua <span class="text-[#ff914d] font-bold">Produk</span>
                </h2>
            </div>

            <div class="grid grid-cols-5 gap-x-3 ">
                <div v-for="product in products" :key="product.id">
                    <div class="shadow-md border relative my-3">
                        <div class="w-full">
                            <img :src="product.image" class="w-full">
                        </div>
                        <div class="flex flex-col">
                            <p class="text-md font-bold text-gray-500 capitalize px-3">{{ product.title }}</p>
                            <div class="flex justify-between items-center px-3">
                                <p v-if="product.discount" class="text-sm text-gray-500"><s>Rp. {{
                                    moneyFormat(product.price) }}</s></p>

                                <p class="text-md font-semibold text-[#ff914d]">
                                    Rp. {{ moneyFormat(calculateDiscount(product)) }}
                                </p>
                            </div>
                            <p v-if="product.discount"
                                class="absolute top-[10px] right-[10px] bg-[#ff914d] font-semibold text-[11px] text-white px-2 py-1 rounded">
                                Diskon
                                {{ product.discount }} %</p>

                            <div class="flex justify-between px-3 my-3">
                                <router-link :to="{name: 'detail_product', params:{slug: product.slug }}"  class="bg-[#ff914d] text-white px-2 py-1 rounded text-sm hover:shadow-lg">lihat
                                    produk</router-link>
                                <button class="hover:shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#ff914d"
                                            d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="nextExists" class="w-full text-center">
                <button @click="loadMore" class="bg-[#ff914d] px-3 py-2 w-fit rounded text-white font-semibold">Load
                    More</button>
            </div>

        </div>

        <div class="container mx-auto py-2 px-2 lg:p-0 lg:hidden">
            <div class="border-b-2  border-[#ff914d] w-fit pb-1">
                <h2 class="text-sm font-semibold text-gray-500">Semua <span class="text-[#ff914d] font-bold">Produk</span>
                </h2>
            </div>

            <div class="grid grid-cols-12 gap-x-3 ">

                <div v-for="product in products" :key="product.id" class="col-span-6">
                    <div>
                        <div class="shadow-md border relative my-3">
                            <div class="w-full ">
                                <img :src="product.image" class="w-1/2 mx-auto">
                            </div>
                            <div class="flex flex-col">
                                <p class="text-[12px] font-semibold text-gray-500 capitalize px-3">{{ product.title }}</p>
                                <div class="flex justify-between items-center px-3">
                                    <p v-if="product.discount" class="text-[10px] text-gray-500"><s>Rp. {{
                                        moneyFormat(product.price) }}</s></p>
    
                                    <p class="text-[13px] font-semibold text-[#ff914d]">
                                        Rp. {{ moneyFormat(calculateDiscount(product)) }}
                                    </p>
                                </div>
                                <p v-if="product.discount"
                                    class="absolute top-[10px] right-[10px] bg-[#ff914d] font-semibold text-[10px] text-white px-1 rounded">
                                    Diskon
                                    {{ product.discount }} %</p>
    
                                <div class="flex justify-between px-3 my-3 items-center">
                                    <router-link :to="{name: 'detail_product', params:{slug: product.slug }}"  class="text-[11px] w-full bg-[#ff914d] py-1 text-center font-semibold text-white capitalize rounded">lihat
                                        produk</router-link>

                                    <button class="hover:shadow-lg ml-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="#ff914d"
                                                d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>

            <div v-if="nextExists" class="w-full text-center">
                <button @click="loadMore" class="bg-[#ff914d] w-fit rounded text-[11px] px-3 py-1 text-white font-semibold">Load
                    More</button>
            </div>
            
        </div>


    </div>
</template>

<script>
import SliderComponent from '../../components/Slider.vue'
import CategoryComponent from '../../components/Category.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'HomeComponent',

    components: {
        //customer menu component
        SliderComponent,
        CategoryComponent
    },

    setup() {

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action "getProducts" di module "product"
        onMounted(() => {
            store.dispatch('product/getProducts')
        })

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

        return {
            store,
            products,
            nextExists,     // <-- return nextExists,
            nextPage,       // <-- return nextPage
            loadMore,
        }

    }

}
</script>