<template>
    <HeaderSecond props="Pembayaran" />
    <div class="container max-w-xl mx-auto py-2 px-2 h-screen  pb-20 ">
        <div class="h-1/2 bg-green-700 pt-24 text-center">
                <p class="font-semibold text-white text-xl">Pembayaran</p>
            </div>

        <div class="flex flex-col gap-y-5 shadow-lg rounded-lg py-5 pb-10 bg-white mx-5 p-5" style="z-index: 1; margin-top: -150px;">
            <h5 class=" text-gray-500 font-semibold">Rincian Pengiriman</h5>
            <form>
                <div class="grid grid-cols-12 gap-x-4 mb-4">
                    <div class="col-span-12 mt-3">
                        <div class="flex flex-col gap-y-2
                    ">
                            <label for="" class=" text-gray-500 font-semibold">Nama Lengkap</label>
                            <input type="text" v-model="state.name" placeholder="Nama Lengkap"
                                class="focus:outline-none border-[1px] w-full px-2 py-2 bg-white ">
                            <p v-if="validation.name" class="text-red-500 ">{{ validation.name[0] }}</p>
                        </div>
                    </div>
                    <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2">
                            <label class=" text-gray-500 font-semibold" for="">No Whatsapp</label>
                            <div class="flex items-center">
                                <span class="bg-white p-2 border-[1px] font-semibold ">62</span>
                                <input type="number" v-model="state.phone" placeholder="Nomor Whatsapp (62822xxxxxxxx)"
                                    class="focus:outline-none border-[1px]  w-full px-2 py-2 bg-white">
                                <p v-if="validation.phone" class="text-red-500 ">{{ validation.phone[0]
                                    }}</p>
                            </div>

                        </div>
                    </div>

                    <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2
                    ">
                            <label for="" class=" text-gray-500 font-semibold">Alamat</label>
                            <textarea class="focus:outline-none  border-[1px] w-full px-2 py-2 bg-white" id="alamat"
                                rows="3"
                                placeholder="Contoh: Jln Wiajaya kusuma 1 RT 03 RW 05 14630"
                                v-model="state.address"></textarea>
                            <p v-if="validation.address" class="text-red-500 ">{{ validation.address[0]
                                }}</p>
                        </div>
                    </div>


                    <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2">
                            <label class=" text-gray-500 font-semibold" for="">Provinsi</label>
                            <select class=" text-gray-500 border-[1px] w-full px-2 py-2 bg-white" @change="getCities"
                                v-model="state.province_id">
                                <option class="" value="">-- pilih provinsi --</option>
                                <option class="" v-for="province in state.provinces" :key="province.id"
                                    :value="province.province_id">
                                    {{ province.name }}</option>
                            </select>
                            <p v-if="validation.province_id" class="text-red-500 ">{{
                                validation.province_id[0] }}</p>
                        </div>
                    </div>

                    <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2">
                            <label class=" text-gray-500 font-semibold" for="">Kota / Kabupaten</label>
                            <select class=" text-gray-500 border-[1px] w-full px-2 py-2 bg-white"
                                v-model="state.city_id" @change="getCourier">
                                <option class="" value="">-- pilih kota --</option>
                                <option class="" v-for="city in state.cities" :key="city.id" :value="city.city_id">{{
                                city.name }}
                                </option>
                            </select>
                            <p v-if="validation.city_id" class="text-red-500 ">{{ validation.city_id[0]
                                }}</p>
                        </div>
                    </div>

                    <!-- <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2">
                            <label class=" text-gray-500 font-semibold" for="">Kurir Pengiriman</label>
                            <div class="flex gap-x-2">
                                <input class="form-check-input select-courier" type="radio" name="courier"
                                    id="ongkos_kirim-jne" value="jne" v-model="state.courier_type" @change="getOngkir">
                                <label class=" text-gray-500 font-semibold" for="ongkos_kirim-jne">
                                    JNE</label>
                                <input class="form-check-input select-courier" type="radio" name="courier"
                                    id="ongkos_kirim-tiki" value="tiki" v-model="state.courier_type"
                                    @change="getOngkir">
                                <label class=" text-gray-500 font-semibold" for="ongkos_kirim-jnt">TIKI</label>
                                <input class="form-check-input select-courier" type="radio" name="courier"
                                    id="ongkos_kirim-pos" value="pos" v-model="state.courier_type" @change="getOngkir">
                                <label class=" text-gray-500 font-semibold" for="ongkos_kirim-jnt">POS</label>

                            </div>

                            <p v-if="validation.courier_type" class="text-red-500 ">{{
                                validation.courier_type[0] }}</p>
                        </div>
                    </div> -->

                    <!-- <div class="col-span-12 my-2">
                        <div class="flex flex-col gap-y-2">
                            <label class=" text-gray-500 font-semibold" for="">Service Kurir</label>
                            <div v-for="value in state.costs" :key="value.service" class="flex gap-x-2">
                                <input class="form-check-input" type="radio" name="cost" :id="value.service"
                                    :value="value.cost[0].value + '|' + value.service" v-model="state.costService"
                                    @change="getCostService">
                                <label class=" text-gray-500 font-semibold" :for="value.service">
                                    {{ value.service }} - Rp. {{ moneyFormat(value.cost[0].value) }}</label>
                            </div>
                        </div>
                    </div> -->


                </div>



                <div class="flex flex-col gap-y-2 pb-20">
                    <h5 class="text-sm text-gray-500 font-semibold">Rincian Belanja</h5>
                    <div class="flex justify-between">
                        <p class=" font-semibold text-gray-500">Total Belanja</p>
                        <p class=" text-gray-500">Rp {{ moneyFormat(cartTotal) }}</p>
                    </div>
                    <p class="text-green-700 italic px-2 py-2 bg-gray-100">Harga ongkos kirim akan di infokan oleh cs, pastikan nomor whatsapp benar dan terdaftar agar segera dihubungi cs artomoro</p>
                    <p class="text-sm font-bold">*Gratis ongkir untuk wilayah pamulang, serpong dan gunung sindur</p>
                    <!-- <div class="flex justify-between">
                        <p class=" font-semibold text-gray-500">Ongkos Kirim <span class="text-green-600">({{
                                cartWeight }} g)</span></p>

                        <p class=" m-0 text-gray-500" id="ongkir-cart">Rp {{ moneyFormat(state.courier_cost) }}</p>
                    </div> -->
                    <!-- <div class="w-full pt-[1px] bg-gray-300 mt-3"></div> -->
                    <!-- <div class="flex justify-between">
                        <p class=" font-semibold text-gray-500">Grand Total</p>

                        <p class=" m-0 text-gray-500 font-semibold">Rp {{ moneyFormat(state.grandTotal) }}</p>
                    </div> -->
                  

                </div>
                <!-- <div class="flex flex-col mt-4 mb-20">
                    <h5 class="text-sm text-gray-500 font-semibold mb-3">Pilih Metode Pembayaran</h5>
                    <div v-for="m in metodepayment" :key="m.id" class="flex gap-x-2">
                        <input class="form-check-input" type="radio" :value="m.id" v-model="state.pembayaranlocal_id">
                        <label class=" text-gray-500 font-semibold" :for="m.ide">
                            {{ m.nama_metode }}&nbsp;{{ m.no_rekening }}&nbsp;{{ m.nama_pemilik_rekening }}</label>
                    </div>
                </div> -->
            </form>
        </div>


    </div>

    <div class="px-3 w-full mx-auto py-3 fixed inset-x-0 bottom-0 z-10  bg-white">
        <footer class="flex  gap-x-2 max-w-xl mx-auto">
            <router-link :to="{ name: 'cart' }"
                class="block w-full text-center py-2 border-green-600 font-semibold border-[1px]  text-green-600 rounded hover:bg-gray-50">Kembali</router-link>
            <button @click.prevent="checkout"
                class="block w-full text-center py-2 bg-green-700 font-semibold  text-white rounded hover:bg-green-500">
                Pembayaran
            </button>
        </footer>
    </div>
</template>




<script>
import { onMounted, computed, reactive } from 'vue'
import { useStore } from 'vuex' // <-- vuex
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";
import HeaderSecond from '../../components/HeaderSecond.vue'
import Api from '../../api/Api'
import { useRoute } from 'vue-router' // vue router

export default {

    name: 'CartComponent',
    components: {
        HeaderSecond
    },

    setup() {

        //store vuex
        const route = useRoute()
        const store = useStore()
        const router = useRouter();

        //mounted cart
        onMounted(() => {

            store.dispatch('auth/getUser')
            store.dispatch['auth/isLoggedIn']
            //menjalankan beberapa actions di module cart
            store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartWeight')
            store.dispatch('pembayaranlocal/getData') // <-- untuk memanggil action "cartWeight" di module "cart"

        })

        //get data cart dari getters cart di module cart
        const carts = computed(() => {
            return store.getters['cart/getCart']
        })

        const user = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })

        const metodepayment = computed(() => {
            return store.getters['pembayaranlocal/getData']
        })

        //get total cart dari state cartTotal di module cart
        const cartTotal = computed(() => {
            return store.state.cart.cartTotal
        })

        //get cart weight dari state cartWeight di module cart
        const cartWeight = computed(() => {
            return store.state.cart.cartWeight
        })



        function confirmDelete(id) {
            Swal.fire({
                title: 'Konfirmasi',
                text: 'Apakah Anda yakin ingin menghapus data?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    store.dispatch('cart/removeCart', id)
                        .then(() => {

                            store.dispatch("cart/getCart");

                            router.push({ name: "cart" });
                            //alert
                            Swal.fire({
                                title: 'BERHASIL!',
                                text: "Data Berhasil Dihapus!",
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            })



                        })
                }
            });
        }


        const TambahQty = (itemId) => {
            const cartItem = carts.value.find(item => item.id === itemId);

            // console.log(cartItem.product.price);
            if (cartItem) {
                cartItem.quantity += 1;

                const price = cartItem.quantity * (cartItem.product.price - (cartItem.product.price * (cartItem.product.discount) / 100));
                const weight = cartItem.quantity * cartItem.product.weight;


                let formData = new FormData();
                formData.append('quantity', cartItem.quantity)
                formData.append('price', price)
                formData.append('weight', weight)

                formData.append("_method", "POST");

                store
                    .dispatch("cart/update", {
                        cartId: itemId,
                        payload: formData,
                    })
                    .then(() => {
                        //redirect ke dashboard
                        router.push({ name: "cart" });
                        store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                        store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                        store.dispatch('cart/cartWeight')


                        // toast.success("Tambah produk ke keranjang berhasil")
                    })
                    .catch((error) => {
                        //show validaation message
                        console.log(error);


                    });
            }



        };

        // Fungsi untuk mengurangkan kuantitas
        const KuranginQty = (itemId) => {
            const cartItem = carts.value.find(item => item.id === itemId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                const price = cartItem.quantity * (cartItem.product.price - (cartItem.product.price * (cartItem.product.discount) / 100));
                const weight = cartItem.quantity * cartItem.product.weight;


                let formData = new FormData();
                formData.append('quantity', cartItem.quantity)
                formData.append('price', price)
                formData.append('weight', weight)

                formData.append("_method", "POST");

                store
                    .dispatch("cart/update", {
                        cartId: itemId,
                        payload: formData,
                    })
                    .then(() => {
                        //redirect ke dashboard
                        router.push({ name: "cart" });
                        store.dispatch('cart/cartCount')  // <-- untuk memanggil action "cartCount" di module "cart"
                        store.dispatch('cart/cartTotal')  // <-- untuk memanggil action "cartTotal" di module "cart"
                        store.dispatch('cart/cartWeight')


                        // toast.success("Tambah data berhasil")
                    })
                    .catch((error) => {
                        //show validaation message
                        console.log(error);


                    });
            } else if (cartItem && cartItem.quantity === 1) {
                // Kuantitas mencapai 0, konfirmasi penghapusan
                confirmDelete(itemId);
            }
        };

        //define state form
        const state = reactive({
            name: '',     // <-- state name
            phone: '',     // <-- state phone  
            address: '',     // <-- state address  
            provinces: [],     // <-- state provinces
            province_id: '',     // <-- state ID province
            cities: [],     // <-- state cities
            city_id: '',     // <-- state ID City
            courier: false,  // <-- state pilihan kurir
            courier_type: '',     // <-- state jenis kurir 
            cost: false,  // <-- state cost kurir
            costs: '',     // <-- state costs kurir
            costService: '',     // <-- state get data cost dan service pengiriman
            courier_cost: 0,      // <-- state untuk menyimpan cost kurir
            courier_service: '',     // <- state untuk menyimpan service kurir        
            buttonCheckout: false,  // <-- state button checkout 
            grandTotal: cartTotal,
            pembayaranlocal_id: ''     // <-- state untuk grand total 
        })

        //define state validation
        const validation = reactive({
            name: false, // <-- validation name
            phone: false, // <-- validation phone
            address: false, // <-- validation address 
            pembayaranlocal_id: false
        })

        //mounted data provinces
        const provinces = onMounted(() => {

            Api.get('/rajaongkir/provinces')

                .then(response => {

                    state.provinces = response.data.data // <-- assign state provinces dengan data hasil response

                }).catch(error => {
                    console.log(error)
                })

        })

        //fungsi mendapatkan data kota berdasarkan ID provinsi
        function getCities() {
            console.log(state.province_id);
            Api.get('/rajaongkir/cities', {
                params: {
                    province_id: state.province_id // ID provinsi
                }
            })
                .then(response => {

                    state.cities = response.data.data // <-- assign state cities dengan data hasil response

                }).catch(error => {
                    console.log(error)
                })

        }

        //fungsi menampilkan pilihan courier
        function getCourier() {
            // set state courier menjadi true, untuk menampilkan pilihan kurir
            state.courier = true
        }

        //fungsi untuk mendapatkan biaya ongkos kirim
        function getOngkir() {

            //check berat produk
            if (cartWeight.value == 0) {
                alert('silahkan pilih produk terlebih dahulu!')
                return
            }

            Api.post('/rajaongkir/checkOngkir', {
                city_destination: state.city_id,    // <-- ID kota
                weight: cartWeight.value,   // berat produk
                courier: state.courier_type         // jenis kurir
            })
                .then(response => {

                    // set state cost menjadi true, untuk menampilkan pilihan cost pengiriman
                    state.cost = true

                    //assign state costs dengan hasil response
                    state.costs = response.data.data.costs

                }).catch(error => {
                    console.log(error)
                })

        }

        //fungsi untuk mengambil biaya ongkos kirim dan service kurir
        function getCostService() {

            //split value dengan menghapus string -> | 
            let shipping = state.costService.split("|")

            //set state cost dan service
            state.courier_cost = shipping[0]
            state.courier_service = shipping[1]

            //hitung grandrotal
            const token = store.state.auth.token

            Api.defaults.headers.common['Authorization'] = "Bearer" + token
            Api.get('cart/total')
                .then(response => {

                    //jumlahkan total cart dan cost pengiriman
                    state.grandTotal = parseInt(response.data.total)

                    // state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost)

                })

            //show button checkout
            state.buttonCheckout = true
        }

        const isLoggedIn = computed(() => {

            //get getter "isLoggedIn" dari module "auth"
            return store.getters['auth/isLoggedIn']

        })


        function checkout() {
           
            if (!this.isLoggedIn) {
                return router.push({ name: 'login' })
            }
            //ceck apakah ada nama, phone, address dan berat produk ?
            if (state.name && state.phone && state.address && cartWeight.value) {

                //define variable
                let data = {
                    name: state.name,
                    phone: state.phone,
                    province_id: state.province_id,
                    city_id: state.city_id,
                    courier_type: 'COD',
                    courier_service: 'KURIR TOKO',
                    courier_cost: 0,
                    weight: cartWeight.value,
                    address: state.address,
                    grandTotal: state.grandTotal,
                    pembayaranlocal_id: state.pembayaranlocal_id
                }
                console.log('daia', data);
                store.dispatch('cart/checkout', data)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Transaksi berhasil',
                        });
                        //jika berhasil, arahakan ke detail order dengan parameter snap_token midtrans
                        router.push({ name: 'home' })


                    }).catch(error => {
                        console.log(error)
                    })

            }

            //check validasi name
            if (!state.name) {
                validation.name = true
            }

            //check validasi phone
            if (!state.phone) {
                validation.phone = true
            }

            //check validasi address
            if (!state.address) {
                validation.address = true
            }

        }


        return {
            carts,              // <-- state carts
            cartTotal,          // <-- state cartTotal
            cartWeight,
            checkout,
            confirmDelete,
            TambahQty,
            KuranginQty,
            state,              // <-- state form
            validation,         // <-- state validation
            provinces,          // <-- data provinces
            getCities,          // <-- data city
            getCourier,         // <-- get data courier
            getOngkir,          // <-- get data ongkir
            getCostService,
            metodepayment,
            isLoggedIn,
            user
        }

    }

}
</script>

<style>
/* Gaya untuk menghilangkan tombol panah di input type number */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>