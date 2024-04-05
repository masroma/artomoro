<template>
    <div>
      
        <!-- tablet mobile -->
        <div class="container mx-auto py-2 px-3 ">
            <div class="mb-5">
                <h2 class="text-lg font-semibold ">Kategori</h2>
            </div>

            <Carousel v-bind="settings" :breakpoints="breakpoints">
                <slide v-for="category in categories" :key="id" class="">
                    <router-link :to="{name: 'detail_category', params:{slug: category.slug }}" class="p-0 flex flex-col gap-y-2">
                        <img :src="category.image" class="max-w-20 rounded-full" :alt="category.name">
                        <p class="font-semibold capitalize">
                            {{ limitCharacters(category.name,6) }}
                        </p>
                    </router-link>
                    
                </slide>
    
                <template #addons>
                   
                </template>
            </carousel>

        </div>
        <!-- tablet mobile -->
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
            itemsToShow: 4.30,
            snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 4.5,
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

        const limitCharacters = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...'; // Menambahkan ellipsis jika teks melebihi maxLength
            } else {
                return text;
            }
        };


        return {
            categories,
            limitCharacters
        }

    }

}
</script>