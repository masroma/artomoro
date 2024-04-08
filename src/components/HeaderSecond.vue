<template>
     <div class="px-3 w-full mx-auto py-3 bg-white sticky top-0 z-50">
            <div class="flex justify-between items-center max-w-xl mx-auto">
                <div class=" items-end px-1 ms-3 relative bg-gray-100 py-2 px-2 rounded-full">
                    
                    <router-link :to="{name: link ?? 'home'}" class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"/></svg> 
                    </router-link>
                </div>

                <p class="text-base font-semibold justify-center capitalize">
                 {{ props.name ? props.name : props.title ? props.title : props }}
                </p>

                <div class=" items-end px-1 ms-3 relative bg-green-700 py-2 px-2 rounded-full">
                    
                    <router-link :to="{name: 'cart'}" class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="white" d="M454.65 169.4A31.82 31.82 0 0 0 432 160h-64v-16a112 112 0 0 0-224 0v16H80a32 32 0 0 0-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0 0 50.48-20.55a69.48 69.48 0 0 0 21.52-50.2V192a31.75 31.75 0 0 0-9.35-22.6M176 144a80 80 0 0 1 160 0v16H176Z"/></svg>  
                        
                       <span v-if="cartCount != 0"  class="absolute text-[9px] bg-[#ff914d] px-2 py-1 left-4 top-[-5px] rounded-full text-white" > {{ cartCount }} </span>
                      
                    </router-link>
                </div>
            </div>
        
    </div>

   
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'HeaderComponent',
    props: ['props','link'],

    setup() {

        //store vuex
        const store = useStore()

        const isLoggedIn = computed(() => {

            //get getter "isLoggedIn" dari module "auth"
            return store.getters['auth/isLoggedIn']

        })

        //cart count
        const cartCount = computed(() => {

            //get getter "cartCount" dari module "auth"
            return store.getters['cart/cartCount']
        })

        //cart total
        const cartTotal = computed(() => {

            //get getter "cartTotal" dari module "auth"
            return store.getters['cart/cartTotal']
        })


        


        //mounted
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

            const token = store.state.auth.token

            if (!token) {
                return
            }

            //saat mounted, akan memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartCount')

            //saat mounted, akan memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartTotal')


        })

        //computed
        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        //return a state and function
        return {
            store,
            user,
            isLoggedIn,
            cartTotal,
            cartCount
        }

    }
}
</script>