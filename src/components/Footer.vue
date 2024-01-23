<template>
    <div class="bg-[#ff914d] py-10">
        <div class="max-w-6xl mx-auto flex items-center gap-x-96 mb-5">
            
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
               
                <img src="/logoartomoro.png" alt="" class="w-[250px]" >
                <p class="text-white text-sm">
                    Artomoro frozen menjual berbagai macam <br/>frozen food, bahan kue dan bumbu dapur
                </p>
            </div>

            <div class="paymentmethod">
                 <div class="flex flex-col gap-y-2">
                    <div class="flex gap-2">
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/atm-bersama.jpg" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/BCA.png" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/BNI.png" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/BRI.png" alt="">
                        </div>
                        
                       
                     </div>

                     <div class="flex gap-2">
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/CIMB.png" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/GOPAY.png" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/indomaret-logo.png" alt="">
                        </div>
    
                        <div class="flex bg-white w-[50px] items-center py-1 px-1 rounded-sm">
                            <img src="/tabungan_pensiunan_nasional.png" alt="">
                        </div>
                        
                       
                     </div>
                 </div>
                
            </div>

            <div class="tentang flex flex-col gap-y-2 ">
               

                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.2648998501995!2d106.71569439999999!3d-6.359749999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjEnMzUuMSJTIDEwNsKwNDInNTYuNSJF!5e0!3m2!1sid!2sid!4v1704370611933!5m2!1sid!2sid" width="260" height="120" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

               <div class="flex gap-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21.34" viewBox="0 0 576 512"><path fill="white" d="m547.6 103.8l-57.3-90.7C485.2 5 476.1 0 466.4 0H109.6c-9.7 0-18.8 5-23.9 13.1l-57.4 90.7c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1.8 12.1.8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29s49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zm-47.9 151.1h-.1c-5.3.7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1H76c-4.1-.6-8.1-1.3-12-2.3V448c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V252.6c-4 1-8 1.8-12.3 2.3"/></svg>
                <p class="text-sm text-white">jl pamulang raya no 34 </p>
               </div>

              

             
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FooterComponent',
    }
</script>