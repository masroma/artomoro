<template>
   <div class="max-w-6xl mx-auto flex flex-col gap-y-5">
    <div class="my-5">
      
        <div class="flex flex-col">
         <h2 class="text-xl font-semibold text-gray-500">Category  
         </h2>
         <div class="flex gap-x-2">
            <router-link class="text-sm text-gray-500" :to="{name: 'home'}">Home</router-link>
            <span class="text-sm text-gray-500"> > </span>
            <router-link class="text-sm text-[#ff914d]" :to="{name: 'detail_category', params:{slug: categories.slug }}">{{categories.name}}</router-link>
         </div>
        </div>
     </div>
     <div class="grid grid-cols-5 gap-x-3">
        <div v-for="product in products" :key="product.id">
            <div class="shadow-md border relative my-3">
                <div class=" w-full   ">
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
                        <button class="bg-[#ff914d] text-white px-2 py-1 rounded text-sm hover:shadow-lg">lihat
                            produk</button>
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

  
   </div>
</template>

<script>
    import { computed, onMounted } from 'vue'   // computed dan onMounted
    import { useStore } from 'vuex' // store Vuex
    import { useRoute } from 'vue-router' // vue router

    export default {

        name: 'CategoryShowComponent',

        setup() {

            //store vuex
            const store = useStore()

            //vue route
            const route = useRoute()

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

            return {
                store,
                route,
                products,
                categories
            }

        }

    }
</script>