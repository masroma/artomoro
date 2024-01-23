<template>
    <div class="my-10 flex flex-col gap-y-10">
        
        <div class="border-b-2  border-[#ff914d] w-fit pb-1">
            <h2 class="text-xl font-semibold text-gray-500">Kategori <span class="text-[#ff914d] font-bold">Produk</span></h2>
        </div>
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <slide v-for="category in categories" :key="id" class="">
                <router-link :to="{name: 'detail_category', params:{slug: category.slug }}" class="bg-white px-5 py-5 flex flex-col gap-y-5">
                    <img :src="category.image">
                    <p class="text-base text-gray-500 capitalize">
                        {{ category.name }}
                    </p>
                </router-link>
                
            </slide>

            <template #addons>
                <navigation />
            </template>
        </carousel>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {

    name: 'CategoryComponent',
    components: {
        Carousel,
        Slide,
        Navigation,
    },

    data: () => ({
        // carousel settings
        settings: {
            itemsToShow: 1,
            snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 6,
                snapAlign: 'start',
            },
        },
    }),

    setup() {

        //store vuex
        const store = useStore()

        //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('category/getCategories')
        })

        //computed properti digunakan untuk get data categories dari state di module category 
        const categories = computed(() => {
            return store.state.category.categories
        })

        return {
            categories
        }

    }

}
</script>