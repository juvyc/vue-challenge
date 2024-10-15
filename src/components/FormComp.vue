<template>

    <div class="contentwrp">
       
       <ul class="breadcrumbswrp">
        <li><a href="#"><img :src="homeIco" /></a></li>
        <li class="septr"> <img :src="homeSeptr" /> </li>
        <li><a href="#">Profile</a></li>
        <li class="septr">/</li>
        <li>Profile Details</li>
       </ul>

       <h2 class="page-title">Profile Detail</h2>
    </div>

    <formcontent />
    
</template>

<script>

import { Form } from "@progress/kendo-vue-form";
import FormContent from './FormContent.vue';
import homeIco from '../assets/homeico.png';
import homeSeptr from '../assets/Chevron Right.png';
export default {
    components: {
      'k-form': Form,
      'formcontent': FormContent
    },
    data() {
      return {
        homeIco,
        homeSeptr
      };
    },
};

</script>

