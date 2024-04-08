<template>
  
  <HeaderSecond props="" link="dashboard"  />
  <form @submit.prevent="updateprofile" >
    <div class="container max-w-xl mx-auto   px-2 h-screen">
        <div class="h-1/2 bg-green-700 pt-24 text-center">
                <p class="font-semibold text-white text-xl">Update Profile</p>
            </div>

       <div class="flex flex-col gap-y-5 shadow-lg rounded-lg py-5 bg-white mx-5 p-5" style="z-index: 1; margin-top: -150px;">
           <div class="flex flex-col gap-y-2">
               <label for="exampleInputEmail1" class="text-gray-500">Nama</label>
               <input v-model="user.name" type="text" class="bg-white border-[1px] px-2 py-3 rounded-lg">
               <span v-if="validation.name" class="text-red-500 text-sm">{{ validation.name[0] }}</span>
           </div>
           <div class="flex flex-col gap-y-2">
               <label for="exampleInputEmail1" class="text-gray-500">Email</label>
               <input v-model="user.email" type="email" class="bg-white border-[1px] px-2 py-3 rounded-lg">
               <span v-if="validation.email" class="text-red-500 text-sm">{{ validation.email[0] }}</span>
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
import { ref, reactive, watch, computed, onMounted } from 'vue'
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