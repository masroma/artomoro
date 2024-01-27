<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5">
        <CustomerMenu class="w-36 border-r" />

        <div class="content flex-1">
            <h1 class="text-lg font-semibold">
                Update Password
            </h1>

            <div class="flex flex-col gap-y-5 mt-5">
                <form @submit.prevent="updatepassword" class="flex flex-col gap-y-5">
                    <div class="flex flex-col gap-y-2">
                        <label for="exampleInputEmail1" class="text-sm text-gray-500">Password Lama</label>
                        <div class="form-group flex items-center">
                            <input placeholder="Password Lama" class="px-2 py-3 flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.oldpassword" :type="showOldPassword ? 'text' : 'password'" >
                            <span @click="toggleOldPasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2"> <i
                                :class="showOldPassword ? 'fa fa-eye-slash text-orange-500' : 'fa fa-eye text-orange-500'"></i></span>
                        </div>
                        <span v-if="validation.oldpassword" class="text-red-500 text-sm">{{ validation.oldpassword[0] }}</span>
                    </div>

                    <div class="flex flex-col gap-y-2">
                        <label for="exampleInputEmail1" class="text-sm text-gray-500">Password Baru</label>
                        <div class="form-group flex items-center">
                            <input placeholder="Password Baru" class="px-2 py-3 flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.password" :type="showPassword ? 'text' : 'password'" >
                            <span @click="togglePasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2"> <i
                                :class="showPassword ? 'fa fa-eye-slash text-orange-500' : 'fa fa-eye text-orange-500'"></i></span>
                        </div>
                        <span v-if="validation.password" class="text-red-500 text-sm">{{ validation.password[0] }}</span>
                    </div>

                    <div class="flex flex-col gap-y-2">
                        <label for="exampleInputEmail1" class="text-sm text-gray-500">Konfirmasi Password</label>
                        <div class="form-group flex items-center">
                            <input placeholder="Konfirmasi Password" class="px-2 py-3 flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'"  >
                            <span  @click="toggleConfirmPasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2"> <i
                                :class="showConfirmPassword ? 'fa fa-eye-slash text-orange-500' : 'fa fa-eye text-orange-500'"></i></span>
                        </div>
                        <span v-if="validation.password" class="text-red-500 text-sm">{{ validation.password[0] }}</span>
                    </div>
                  
                    <button type="submit" class="bg-[#ff914d] px-5 py-2 w-fit rounded text-sm text-white font-semibold hover:shadow-md">
                        Update
                    </button>
                </form>
                
            </div>
        </div>



    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from "sweetalert2";
import CustomerMenu from '../../components/Menu.vue'

export default {

    name: 'LoginComponent',
    components: {
        //customer menu component
        CustomerMenu
    },


    setup() {

        const password = ref('');
        const showPassword = ref(false);
        const showOldPassword = ref(false);
        const showConfirmPassword = ref(false);

        // Methods
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleOldPasswordVisibility = () => {
            showOldPassword.value = !showOldPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        //user state
        const user = reactive({
           
            password: '',
            oldpassword:'',
            password_confirmation: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //method login
        function updatepassword() {
            let formData = new FormData();
            formData.append('oldpassword', this.user.oldpassword)
            formData.append('password', this.user.password)
            formData.append('password_confirmation', this.user.password_confirmation)
          

            formData.append("_method", "POST");
            //panggil actions "register" dari module "auth"
            store
                .dispatch("auth/updatePassword", formData)
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: "update-password" });
                    Swal.fire({
                        icon: "success",
                        title: "Data berhasil diupdate",
                    });

                    // toast.success("Tambah data berhasil")
                })
                .catch((error) => {
                    //show validaation message
                    

                    validation.value = error.errors;
                    console.log(validation.value);

                    Swal.fire({
                        title: "GAGAL!",
                        text:"Kolom wajib diisi",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    // console.error("An error occurred:", error);
                });
        }

        //return object
        return {
            password,
            showPassword,
            showOldPassword,
            showConfirmPassword,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            toggleOldPasswordVisibility,
            user,
            validation,
            updatepassword
        }

    }

}
</script>