<template>
  

    <div class="container mx-auto py-2 px-2 max-w-xl h-screen">
        <div class="h-1/2 bg-green-700 pt-32 text-center">
            <p class="font-semibold text-white text-lg">Selamat Datang {{user.name}}</p>
            <p class="text-white text-base">{{user.email}}</p>
        </div>

        
        <div class="flex flex-col gap-y-5 shadow-lg rounded-lg py-5 bg-white mx-5 p-5" style="z-index: 1; margin-top: -100px;">
           
           <router-link :to="{name: 'update-profile' }" class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
               <span class="  text-gray-500">Update Profile</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
           </router-link>
           <router-link :to="{name: 'update-password' }"  class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
               <span class=" text-gray-500">Update Password</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
           </router-link>
           <a @click="logout" style="cursor:pointer"  class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
               <span class="  text-gray-500">Logout</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
           </a>
       </div>
    </div>
    <Footer />
</template>

<script>
//import customer menu component
import CustomerMenu from '../../components/Menu.vue'
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Footer from '../../components/Footer.vue'

export default {

    name: 'DashboardComponent',

    components: {
        //customer menu component
        CustomerMenu,
        Footer
    },

    setup() {

        //store vuex
        const store = useStore()

        //mounted
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

        })

        //computed
        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const router = useRouter()

        //method logout
        function logout() {
            // alert("haa")
            //panggil action "logout" di dalam module "auth"
            store.dispatch('auth/logout')
                .then(() => {

                    //jika berhasil, akan di arahkan ke route login
                    router.push({
                        name: 'login'
                    })

                })

        }

        //return a state and function
        return {
            store,
            user,
            logout
        }

    }

}
</script>