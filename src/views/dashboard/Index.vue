<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5 hidden lg:block">
        <CustomerMenu class="w-36 border-r"/>
        <div class="content  flex-1">
            <h1 class="text-lg font-semibold">
                Selamat datang
            </h1>
        </div>
    </div>

    <div class="container mx-auto py-2 px-2 lg:p-0 lg:hidden">
        <h2 class="text-sm font-semibold text-gray-500">Dashboard
        </h2>
        <div class="flex gap-x-2 mb-3">
            <router-link class="text-[11px] text-gray-500" :to="{ name: 'home' }">Home</router-link>
            <span class="text-[11px] text-gray-500"> > </span>
            <router-link class="text-[11px] text-[#ff914d]"
                :to="{ name: 'dashboard' }">Dashboard</router-link>
        </div>
        <div class="flex flex-col gap-y-1 bg-[#ff914d] py-2 px-2 rounded">
            <p class="text-sm text-white font-semibold">Selemat datang {{user.name}}</p>
            <p class="text-[11px] text-white">{{user.email}}</p>
        </div>

        <div class="flex flex-col  py-2 ">
           
            <router-link :to="{name: 'update-profile' }" class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
                <span class="text-sm  text-gray-500">Update Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
            </router-link>
            <router-link :to="{name: 'update-password' }"  class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
                <span class="text-sm  text-gray-500">Update Password</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
            </router-link>
            <a @click="logout" style="cursor:pointer"  class="flex items-center justify-between w-full border-b-[1px] border-gray-200 py-2 px-2 hover:bg-gray-100">
                <span class="text-sm  text-gray-500">Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20"><path fill="#999999" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
            </a>
        </div>
    </div>
</template>

<script>
//import customer menu component
import CustomerMenu from '../../components/Menu.vue'
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

    name: 'DashboardComponent',

    components: {
        //customer menu component
        CustomerMenu
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