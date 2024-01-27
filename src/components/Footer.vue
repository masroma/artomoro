<template>
    <div class="bg-[#ff914d] py-10">
        <div class="max-w-6xl mx-auto flex items-center gap-x-96 mb-2">

            <p class="text-lg font-semibold text-white">
                Tentang Kami
            </p>
            <p class="text-lg font-semibold text-white">
                Pembayaran
            </p>
            <p class="text-lg font-semibold text-white">
                Lokasi Toko
            </p>
        </div>
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="tentang flex flex-col text-center">

                <img src="/logoartomoro.png" alt="" class="w-[250px]">
                <p class="text-white text-sm">
                    Artomoro frozen menjual berbagai macam <br />frozen food, bahan kue dan bumbu dapur
                </p>
            </div>

            <div class="paymentmethod">
                <div class="flex flex-col gap-y-2">
                    <div class="flex gap-2" v-for="m in metodepayment" :key="m.id">
                       <p class="text-sm text-white font-semibold">
                        {{ m.nama_metode }}&nbsp;{{m.no_rekening}}&nbsp;{{m.nama_pemilik_rekening}}
                       </p> 
                    </div>

                   
                </div>

            </div>

            <div class="tentang flex flex-col gap-y-2 ">


                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253776.9380398063!2d106.42733798671871!3d-6.3597815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e53e33de7e83%3A0xe4d9615b88fc6498!2sArtomoro%20Frozen%20Food!5e0!3m2!1sid!2sid!4v1706351148751!5m2!1sid!2sid" width="260" height="160" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div class="flex gap-x-2 items-center">
                   
                  
                </div>





            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex' // <-- vuex
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