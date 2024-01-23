<template>
    <div class="flex flex-col gap-y-5">
        <h3 class="text-md font-semibold">Main Menu</h3>
        <ul class="flex flex-col gap-y-3">
            <li>
                <router-link :to="{name: 'dashboard' }">Dashboard</router-link>
            </li>
            <li>
                <router-link :to="{name: 'order' }">Order</router-link>
            </li>
            <li>
                <router-link :to="{name: 'dashboard' }">Akun</router-link>
            </li>
            <li>
                <a @click="logout" style="cursor:pointer" >Logout</a>
            </li>
        </ul>
    </div>
</template>
<script>
//import customer menu component
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {

    name: 'MenuComponent',

   

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