<template>
   
    <div class="px-3 w-full mx-auto py-3 bg-white sticky bottom-0 z-50 bg-green-700" >
        <footer class="max-w-xl mx-auto">
            <div class="flex justify-between items-center">
                <router-link :to="{name:'home'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m21.444 9.473l-1.67 10a3 3 0 0 1-1 1.79a3.21 3.21 0 0 1-2 .7h-9.61a3 3 0 0 1-2.93-2.49l-1.67-10a3 3 0 0 1 .23-1.7a3 3 0 0 1 1.12-1.29l6.48-4a3 3 0 0 1 3.15 0l6.47 4c.507.3.911.747 1.16 1.28a3 3 0 0 1 .27 1.71"/></svg>
                    <p :class="$route.name == 'home' ? 'text-white' : 'text-white'">Home</p>
                </router-link>
                <router-link :to="{name:'order'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><defs><mask id="ipSTransaction0"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3"/><path stroke="#000" d="m21 31l5 4l8-10M14 15h20m-20 8h8"/></g></mask></defs><path fill="white" d="M0 0h48v48H0z" mask="url(#ipSTransaction0)"/></svg>
                    <p :class="$route.name == 'order' ? 'text-white' : 'text-white'">Transaksi</p>
                </router-link>
                <a href="https://wa.me/6283890435839" target="_blank" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M18.72 14.76c.35-.85.54-1.76.54-2.76c0-.72-.11-1.41-.3-2.05c-.65.15-1.33.23-2.04.23A9.07 9.07 0 0 1 9.5 6.34a9.21 9.21 0 0 1-4.73 4.88c-.04.25-.04.52-.04.78A7.27 7.27 0 0 0 12 19.27c1.05 0 2.06-.23 2.97-.64c.57 1.09.83 1.63.81 1.63c-1.64.55-2.91.82-3.78.82c-2.42 0-4.73-.95-6.43-2.66a9.03 9.03 0 0 1-2.24-3.69H2v-4.55h1.09a9.09 9.09 0 0 1 15.33-4.6a8.991 8.991 0 0 1 2.47 4.6H22v4.55h-.06L18.38 18l-5.3-.6v-1.67h4.83zm-9.45-2.99c.3 0 .59.12.8.34a1.136 1.136 0 0 1 0 1.6c-.21.21-.5.33-.8.33c-.63 0-1.14-.5-1.14-1.13c0-.63.51-1.14 1.14-1.14m5.45 0c.63 0 1.13.51 1.13 1.14c0 .63-.5 1.13-1.13 1.13c-.63 0-1.14-.5-1.14-1.13a1.14 1.14 0 0 1 1.14-1.14"/></svg>
                    <p class="text-white">Kontak CS</p>
                </a>
                <router-link :to="{name:'dashboard'}" class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 13q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13m-7 8q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14v-1.15q-1.35-1.325-3.137-2.087T12 15q-2.075 0-3.863.763T5 17.85z"/></svg>
                    <p :class="$route.name == 'dashboard' ? 'text-white' : 'text-white text-gray-500'">Akun</p>
                </router-link>
               
            </div>
        </footer>
    </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    name: 'FooterComponent',

    setup() {
       
        const store = useStore()
        onMounted(() => {
            store.dispatch('pembayaranlocal/getData')
        })

        const metodepayment = computed(() => {
            return store.getters['pembayaranlocal/getData']
        })

       

      

        return {
            metodepayment
        }
    }
}
</script>