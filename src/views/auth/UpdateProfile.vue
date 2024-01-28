<template>
    <div class="flex my-5 py-5 max-w-6xl justify-between mx-auto gap-x-5  hidden lg:block">
        <CustomerMenu class="w-36 border-r" />

        <div class="content flex-1">
            <h1 class="text-lg font-semibold">
                Update Profile
            </h1>

            <div class="flex flex-col gap-y-5 mt-5">
                <form @submit.prevent="updateprofile" class="flex flex-col gap-y-5">
                    <div class="flex flex-col gap-y-2">
                        <label for="exampleInputEmail1" class="text-sm text-gray-500">Nama</label>
                        <input v-model="user.name" type="text" class="bg-gray-200 border-[1px] px-1 py-2 rounded">
                        <span v-if="validation.name" class="text-red-500 text-sm">{{ validation.name[0] }}</span>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <label for="exampleInputEmail1" class="text-sm text-gray-500">Email</label>
                        <input v-model="user.email" type="email" class="bg-gray-200 border-[1px] px-1 py-2 rounded">
                        <span v-if="validation.email" class="text-red-500 text-sm">{{ validation.email[0] }}</span>
                    </div>
                    <button type="submit"
                        class="bg-[#ff914d] px-5 py-2 w-fit rounded text-sm text-white font-semibold hover:shadow-md">
                        Update
                    </button>
                </form>

            </div>
        </div>



    </div>

    <div class="container mx-auto py-2 px-2 lg:p-0 lg:hidden">
        <h2 class="text-sm font-semibold text-gray-500">Update Profile
        </h2>
        <div class="flex gap-x-2 mb-3">
            <router-link class="text-[11px] text-gray-500" :to="{ name: 'home' }">Home</router-link>
            <span class="text-[11px] text-gray-500"> > </span>
            <router-link class="text-[11px] text-[#ff914d]" :to="{ name: 'update-profile' }">Update Profile</router-link>
        </div>

        <form @submit.prevent="updateprofile" class="flex flex-col gap-y-5">
            <div class="flex flex-col gap-y-2">
                <label for="exampleInputEmail1" class="text-[11px] text-gray-500">Nama</label>
                <input v-model="user.name" type="text" class="text-[11px] bg-gray-200 border-[1px] px-1 py-2 rounded">
                <span v-if="validation.name" class="text-red-500 text-sm">{{ validation.name[0] }}</span>
            </div>
            <div class="flex flex-col gap-y-2">
                <label for="exampleInputEmail1" class="text-[11px] text-gray-500">Email</label>
                <input v-model="user.email" type="email" class="text-[11px] bg-gray-200 border-[1px] px-1 py-2 rounded">
                <span v-if="validation.email" class="text-red-500 text-sm">{{ validation.email[0] }}</span>
            </div>
            <button type="submit"
                class="text-[11px] bg-[#ff914d] px-5 py-2 w-full rounded  text-white font-semibold hover:shadow-md">
                Update
            </button>
        </form>
    </div>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue'
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



        //user state
        const user = reactive({
            email: '',
            name: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //method login
        onMounted(() => {

            //panggil action "getUser" dari module "auth" vuex
            store.dispatch('auth/getUser')

        })

        const users = computed(() => {
            //panggil getters dengan nama "currentUser" dari module "auth"
            return store.getters['auth/currentUser']
        })


        function updateprofile() {
            let formData = new FormData();
            formData.append('email', this.user.email)
            formData.append('name', this.user.name)


            formData.append("_method", "POST");
            //panggil actions "register" dari module "auth"
            store
                .dispatch("auth/updateProfile", formData)
                .then(() => {
                    //redirect ke dashboard
                    store.dispatch('auth/getUser')
                    router.push({ name: "update-profile" });
                    Swal.fire({
                        icon: "success",
                        title: "Data berhasil diupdate",
                    });

                    // toast.success("Tambah data berhasil")
                })
                .catch((error) => {
                    //show validaation message

                    validation.value = error;
                    // console.log(validation.value);


                    Swal.fire({
                        title: "GAGAL!",
                        text: validation.value.error,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    console.error("An error occurred:", error);
                });
        }

        watch(
            () => store.state.auth.user,
            (newuser) => {
                if (newuser) {
                    const {
                        name,
                        email,

                    } = newuser;
                    user.email = email;
                    user.name = name;


                }
            }
        );

        //return object
        return {
            users,
            user,
            validation,
            updateprofile
        }

    }

}
</script>