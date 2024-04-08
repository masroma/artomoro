<template>

    <HeaderSecond props="" link="dashboard" />
    <form @submit.prevent="updatepassword">
        <div class="container max-w-xl mx-auto  px-2 h-screen">
            <div class="h-1/2 bg-green-700 pt-24 text-center">
                <p class="font-semibold text-white text-xl">Update Password</p>
            </div>

            <div class="flex flex-col gap-y-5 shadow-lg rounded-lg py-5 bg-white mx-5 p-5" style="z-index: 1; margin-top: -150px;">
                <div class="flex flex-col gap-y-2">
                    <label for="exampleInputEmail1" class=" text-gray-500">Password Lama</label>
                    <div class="form-group flex items-center">
                        <input placeholder="Password Lama"
                            class=" px-2 py-[11px] flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.oldpassword" :type="showOldPassword ? 'text' : 'password'">
                        <span @click="toggleOldPasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2"> <i
                                :class="showOldPassword ? ' fa fa-eye-slash text-green-700' : ' fa fa-eye text-green-700'"></i></span>
                    </div>
                    <span v-if="validation.oldpassword" class="text-red-500 ">{{ validation.oldpassword[0]
                        }}</span>
                </div>

                <div class="flex flex-col gap-y-2">
                    <label for="exampleInputEmail1" class=" text-gray-500">Password Baru</label>
                    <div class="form-group flex items-center">
                        <input placeholder="Password Baru"
                            class=" px-2 py-[11px] flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.password" :type="showPassword ? 'text' : 'password'">
                        <span @click="togglePasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2"> <i
                                :class="showPassword ? ' fa fa-eye-slash text-green-700' : ' fa fa-eye text-green-700'"></i></span>
                    </div>
                    <span v-if="validation.password" class="text-red-500 ">{{ validation.password[0] }}</span>
                </div>

                <div class="flex flex-col gap-y-2">
                    <label for="exampleInputEmail1" class=" text-gray-500">Konfirmasi Password</label>
                    <div class="form-group flex items-center">
                        <input placeholder="Konfirmasi Password"
                            class=" px-2 py-[11px] flex-1 focus:outline-none  bg-gray-200 border-[1px]"
                            v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'">
                        <span @click="toggleConfirmPasswordVisibility" class="bg-gray-200 px-2 py-3" id="basic-addon2">
                            <i
                                :class="showConfirmPassword ? ' fa fa-eye-slash text-green-700' : ' fa fa-eye text-green-700'"></i></span>
                    </div>
                    <span v-if="validation.password" class="text-red-500 ">{{ validation.password[0] }}</span>
                </div>


            </div>


        </div>
        <div class="bg-white fixed px-2 py-2  bottom-0 w-full">
            <footer class="max-w-xl mx-auto flex justify-between items-center">
                <button type="submit"
                    class=" bg-green-700 px-5 py-3 w-full rounded  text-white font-semibold hover:shadow-md">
                    Update
                </button>
            </footer>
        </div>
    </form>

</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Swal from "sweetalert2";
import CustomerMenu from '../../components/Menu.vue'
import HeaderSecond from '../../components/HeaderSecond.vue'

export default {

    name: 'LoginComponent',
    components: {
        //customer menu component
        CustomerMenu,
        HeaderSecond
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
            oldpassword: '',
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
                        text: "Kolom wajib diisi",
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