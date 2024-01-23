<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5">
        <CustomerMenu class="w-36 border-r"/>
        <div class="content  flex-1">
            <h1 class="text-lg font-semibold">
                Selamat datang
            </h1>
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
            alert("haa")
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