<template>


    <div class="container max-w-xl mx-auto h-screen">
        <div class="h-1/2 bg-green-700 pt-16 text-center">
            <p class="font-semibold text-white text-3xl">Buat Akun</p>
            <p class="text-white text-lg">Masukan data kamu dibawah ini</p>
        </div>

        <div class="shadow-lg rounded-lg py-5 bg-white mx-5 p-5" style="z-index: 1; margin-top: -200px;">
            <form @submit.prevent="register" class="flex flex-col gap-5">
                <div class="flex flex-col gap-3">
                    <p class="text-base">Nama Lengkap</p>
                   <div>
                    <div :class="['flex','items-center', 'border', {'border-red-500': validation.name}, 'rounded-md', 'px-2']">
                        <input type="text" placeholder="Nama lengkap" v-model="user.name"
                            class=" flex-1 px-2 py-3 focus:outline-none bg-white">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M512 512a192 192 0 1 0 0-384a192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0" />
                            </svg>
                        </span>
                    </div>
                    <p v-if="validation.name" class="text-[11px] text-red-500 text-sm">{{ validation.name[0] }}</p>
                   </div>
                </div>

                <div class="flex flex-col gap-3">
                    <p class="text-base">Email</p>
                    <div>
                        <div :class="['flex','items-center', 'border', {'border-red-500': validation.email}, 'rounded-md', 'px-2']">
                        <input type="text" placeholder="Email" v-model="user.email"
                            class=" flex-1 px-2 py-3 focus:outline-none bg-white">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M14.608 12.172c0 .84.239 1.175.864 1.175c1.393 0 2.28-1.775 2.28-4.727c0-4.512-3.288-6.672-7.393-6.672c-4.223 0-8.064 2.832-8.064 8.184c0 5.112 3.36 7.896 8.52 7.896c1.752 0 2.928-.192 4.727-.792l.386 1.607c-1.776.577-3.674.744-5.137.744c-6.768 0-10.393-3.72-10.393-9.456c0-5.784 4.201-9.72 9.985-9.72c6.024 0 9.215 3.6 9.215 8.016c0 3.744-1.175 6.6-4.871 6.6c-1.681 0-2.784-.672-2.928-2.161c-.432 1.656-1.584 2.161-3.145 2.161c-2.088 0-3.84-1.609-3.84-4.848c0-3.264 1.537-5.28 4.297-5.28c1.464 0 2.376.576 2.782 1.488l.697-1.272h2.016v7.057zm-2.951-3.168c0-1.319-.985-1.872-1.801-1.872c-.888 0-1.871.719-1.871 2.832c0 1.68.744 2.616 1.871 2.616c.792 0 1.801-.504 1.801-1.896z" />
                            </svg>
                        </span>
                    </div>
                    <p v-if="validation.email" class="text-[11px] text-red-500 text-sm">{{ validation.email[0] }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <p class="text-base">Password</p>
                   <div>
                    <div :class="['flex','items-center', 'border', {'border-red-500': validation.password}, 'rounded-md', 'px-2']">
                        <input placeholder="Password" class=" px-2 py-3 flex-1 focus:outline-none  bg-white"
                            v-model="user.password" :type="showPassword ? 'text' : 'password'">

                        <span @click="togglePasswordVisibility" v-if="!showPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                            </svg>
                        </span>

                        <span @click="togglePasswordVisibility" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6.39 6.39 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.77 132.77 0 0 0 27.8-35.14a133.15 133.15 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z" />
                            </svg>
                        </span>
                    </div>
                    <p v-if="validation.password" class="text-[11px] text-red-500 text-sm">{{ validation.password[0] }}</p>
                   </div>
                </div>

                <div class="flex flex-col gap-3">
                    <p class="text-base">Konfirmasi Password</p>
                    <div>
                        <div :class="['flex','items-center', 'border', {'border-red-500': validation.password}, 'rounded-md', 'px-2']">
                        <input placeholder="Konfirmasi Password" class=" px-2 py-3 flex-1 focus:outline-none  bg-white"
                            v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'">
                        <span @click="toggleConfirmPasswordVisibility" v-if="!showConfirmPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                            </svg>
                        </span>

                        <span @click="toggleConfirmPasswordVisibility" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#2F855A'"
                                    d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6.39 6.39 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.77 132.77 0 0 0 27.8-35.14a133.15 133.15 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z" />
                            </svg>
                        </span>
                    </div>
                    <p v-if="validation.password" class="text-[11px] text-red-500 text-sm">{{ validation.password[0] }}</p>
                    </div>
                </div>

                <button class="bg-green-700 hover:bg-green-500 px-5 py-3 w-full rounded-md  hover:shadow-md">

                    <p v-if="!loading" class=" font-semibold text-white">Daftar</p>
                    <p v-else class=" font-semibold text-white">Loading ...</p>
                </button>

                <div class="flex justify-between items-center px-2">
                    <p class=" text-gray-500">Sudah punya akun ? <router-link :to="{ name: 'login' }"
                            class=" font-semibold text-green-600">
                            Masuk
                        </router-link></p>

                        <div class="flex justify-center items-center">
                    <router-link :to="{ name: 'home' }" class="text-base text-green-600 font-semibold">Kembali ke home</router-link>
                </div>


                </div>
            </form>
        </div>

        <!-- <form @submit.prevent="register" class="form-login flex flex-col gap-y-3">
            <div class="form-label-group">
                <div :class="['flex', 'flex-col', 'border', {'border-red-500': validation.name}, 'rounded-md', 'px-2']">
                
                    <div class="form-group flex items-center">
                        <input type="text" placeholder="Nama lengkap" v-model="user.name"
                            class="text-[11px] flex-1 px-2 py-2 focus:outline-none bg-white">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 1024 1024"><path :fill="validation.name ? '#FF0000' : '#999999'" d="M512 512a192 192 0 1 0 0-384a192 192 0 0 0 0 384m0 64a256 256 0 1 1 0-512a256 256 0 0 1 0 512m320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0"/></svg>
                        </span>
                    </div>
                </div>
                <p v-if="validation.name" class="text-[11px] text-red-500 text-sm">{{ validation.name[0] }}</p>
            </div>
            <div class="form-label-group">
                <div :class="['flex', 'flex-col', 'border', {'border-red-500': validation.name}, 'rounded-md', 'px-2']">
                    <div class="form-group flex items-center">
                        <input type="text" placeholder="Email" v-model="user.email"
                            class="text-[11px] flex-1 px-2 py-2 focus:outline-none bg-white">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
                                <path :fill="validation.name ? '#FF0000' : '#999999'"
                                    d="M14.608 12.172c0 .84.239 1.175.864 1.175c1.393 0 2.28-1.775 2.28-4.727c0-4.512-3.288-6.672-7.393-6.672c-4.223 0-8.064 2.832-8.064 8.184c0 5.112 3.36 7.896 8.52 7.896c1.752 0 2.928-.192 4.727-.792l.386 1.607c-1.776.577-3.674.744-5.137.744c-6.768 0-10.393-3.72-10.393-9.456c0-5.784 4.201-9.72 9.985-9.72c6.024 0 9.215 3.6 9.215 8.016c0 3.744-1.175 6.6-4.871 6.6c-1.681 0-2.784-.672-2.928-2.161c-.432 1.656-1.584 2.161-3.145 2.161c-2.088 0-3.84-1.609-3.84-4.848c0-3.264 1.537-5.28 4.297-5.28c1.464 0 2.376.576 2.782 1.488l.697-1.272h2.016v7.057zm-2.951-3.168c0-1.319-.985-1.872-1.801-1.872c-.888 0-1.871.719-1.871 2.832c0 1.68.744 2.616 1.871 2.616c.792 0 1.801-.504 1.801-1.896z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <p v-if="validation.email" class="text-[11px] text-red-500 text-sm">{{ validation.email[0] }}</p>
            </div>
           
            <div class="form-label-group">
                <div :class="['flex', 'flex-col', 'border', {'border-red-500': validation.name}, 'rounded-md', 'px-2']">
                    <div class="form-group flex items-center">
                        <input placeholder="Password" class="text-[11px] px-2 py-2 flex-1 focus:outline-none  bg-white"
                            v-model="user.password" :type="showPassword ? 'text' : 'password'">
                        <span @click="togglePasswordVisibility" v-if="!showPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#999999'"
                                    d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                            </svg>
                        </span>

                        <span @click="togglePasswordVisibility" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
                                <path :fill="validation.name ? '#FF0000' : '#999999'"
                                    d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6.39 6.39 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.77 132.77 0 0 0 27.8-35.14a133.15 133.15 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z" />
                            </svg>
                        </span>
                    </div>
                    


                </div>
                <p v-if="validation.password" class="text-red-500 text-sm">{{ validation.password[0] }}</p>
            </div>
            
            <div class="form-label-group">
            <div :class="['flex', 'flex-col', 'border', {'border-red-500': validation.name}, 'rounded-md', 'px-2']">
                <div class="form-group flex items-center">
                    <input placeholder="Konfirmasi Password" class="text-[11px] px-2 py-2 flex-1 focus:outline-none  bg-white"
                    v-model="user.password_confirmation" :type="showConfirmPassword ? 'text' : 'password'">
                    <span @click="toggleConfirmPasswordVisibility" v-if="!showConfirmPassword">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
                            <path :fill="validation.name ? '#FF0000' : '#999999'"
                                d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32" />
                        </svg>
                    </span>

                    <span @click="toggleConfirmPasswordVisibility" v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
                            <path :fill="validation.name ? '#FF0000' : '#999999'"
                                d="M53.92 34.62a8 8 0 1 0-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0 0 52.07-10.83l22 24.21a8 8 0 1 0 11.84-10.76Zm47.33 75.84l41.67 45.85a32 32 0 0 1-41.67-45.85M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0 1 25 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0 0 63.66 70l14.73 16.2A112 112 0 0 1 128 192m6-95.43a8 8 0 0 1 3-15.72a48.16 48.16 0 0 1 38.77 42.64a8 8 0 0 1-7.22 8.71a6.39 6.39 0 0 1-.75 0a8 8 0 0 1-8-7.26A32.09 32.09 0 0 0 134 96.57m113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 1 1-10.67-11.92a132.77 132.77 0 0 0 27.8-35.14a133.15 133.15 0 0 0-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 0 0-19.36 1.57A8 8 0 1 1 106 49.79A134 134 0 0 1 128 48c34.88 0 66.57 13.26 91.66 38.35c18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 0 1 0 6.5Z" />
                        </svg>
                    </span>
                </div>
                


            </div>
            <p v-if="validation.password" class="text-red-500 text-sm">{{ validation.password[0] }}</p>
            </div>
            <button class="bg-[#ff914d] px-5 py-2 w-full rounded-md  hover:shadow-md">

                <p v-if="!loading" class="text-[11px] font-semibold text-white">Daftar</p>
                <p v-else class="text-[11px] font-semibold text-white">Loading ...</p>
            </button>

            <div class="flex justify-between items-center">
                <p class=" text-[11px] text-gray-500">Sudah punya akun ? <router-link :to="{ name: 'login' }"
                        class="text-[11px] font-semibold text-[#ff914d]">
                        Masuk
                    </router-link></p>
               

            </div>
        </form> -->

        
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name: 'RegisterComponent',
    setup() {
        // Data
        const password = ref('');
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);
        const loading = ref(false);

        // Methods
        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        const user = reactive({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })

        //validation state
        const validation = ref([])

        //store vuex
        const store = useStore()

        //route
        const router = useRouter()

        //function register, fungsi ini di jalankan ketika form di submit
        function register() {

            loading.value = true;
            //define variable 
            let name = user.name
            let email = user.email
            let password = user.password
            let password_confirmation = user.password_confirmation

            //panggil action "register" di dalam module "auth" vuex
            store.dispatch('auth/register', {
                name,
                email,
                password,
                password_confirmation
            })
                .then(() => {
                    //redirect ke dashboard
                    router.push({ name: 'dashboard' })
                }).catch(error => {

                    //show validaation message
                    validation.value = error
                })
        }

        onMounted(() => {
            if (store.getters['auth/isLoggedIn']) {
                router.push({ name: 'dashboard' })
            }
        })

        // Template
        return {
            password,
            showPassword,
            showConfirmPassword,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            user,
            validation,
            register,
            store
        };
    }
}
</script>