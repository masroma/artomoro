<template>
  <div>
    <!-- dekstop -->
  
    <!-- mobile -->
    <div class="container mx-auto py-5 px-2 mt-5">
      <carousel :itemsToShow="1.35" :autoplay="3000" :wrapAround="true" :transition="800">
        <slide v-for="(slider, id) in sliders" :key="id" >
            <img :src="slider.image" class="w-full rounded-lg max-h-[340px] mx-1 shadow-lg">
        </slide>
    
        <template #addons>
         
       
        </template>
      </carousel>
    </div>
    <!-- mobile -->
  </div>
  
</template>

<script>
    import { computed, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

    export default {

        name: 'SliderComponent',

        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },

        setup() {

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getSliders" di module "slider"
            onMounted(() => {
                store.dispatch('slider/getSliders')
            })

            //computed properti digunakan untuk mendapatkan data dari state "sliders" di module "slider" 
            const sliders = computed(() => {
                return store.state.slider.sliders
            })

            return {
                store,
                sliders,
               
            }

        }

    }
</script>


<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}


</style>