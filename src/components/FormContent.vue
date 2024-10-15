<template>
  <div class="contentwrp">
    <div class="frmNoteWrp" :class="!isFieldsCompleted ? 'frmNoteWrpDark' : '' ">
      This is the personal information you use to access and manage your account. Your email address will be used for account securty, recovery, and notifications.
    </div>

    <div class="frmBoxWrp">
      <h2 class="frm-title">Details</h2>
      <json-forms
            :data="data"
            :schema="schema"
            :uischema="uischema"
            :renderers="renderers"
            @change="onChange"
        />
    </div>
  </div>

  <div class="frmbtnwrp">
      <div class="contentwrp">
        <button class="btnnext" @click="toggleDialog" :disabled="!isFieldsCompleted">Next <img :src="btnarrow" /></button>
      </div>
    </div>


    <k-dialog v-if="visibleDialog" :title="'Please confirm'" @close="toggleDialog">
        <p :style="{textAlign: 'center' }">Are you sure you want to continue?</p>
        <dialog-actions-bar>
            <kbutton @click='toggleDialog'>No</kbutton>
            <kbutton :theme-color="'primary'" @click='whenProceed'>Yes</kbutton>
        </dialog-actions-bar>
    </k-dialog>

  </template>

<script>

import { JsonForms } from '@jsonforms/vue';
import btnarrow from '../assets/btn=arrow-next.png';
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers,
} from '@jsonforms/vue-vanilla';

import { defineComponent } from 'vue';

import { Dialog, DialogActionsBar } from '@progress/kendo-vue-dialogs';
import { Button } from '@progress/kendo-vue-buttons';


const myStyles = mergeStyles(defaultStyles, {
  control: { 
        root: 'k-form-field',
        label : 'k-label k-form-label',
        input : 'k-input k-input-md k-input-solid k-rounded-md',
        wrapper : 'k-form-field-wrap',
    },
});

const renderers = [
  ...vanillaRenderers
  // here you can add custom renderers
];

export default defineComponent({
  components: {
    'k-dialog': Dialog,
    'dialog-actions-bar': DialogActionsBar,
    'kbutton': Button,
    JsonForms
  },
  data() {
    return {
      visibleDialog: false,

      btnarrow,

      renderers: Object.freeze(renderers),
      isFieldsCompleted : false,
      data: {},

      schema: {
        properties: {
          forename: {
            type: 'string',
            "minLength": 3,
          },

          surename: {
            type: 'string',
            "minLength": 3,
          },

          birthDate: {
            "type": "string",
            "format": "date"
          },

          email: {
            type: 'string',
            format: "email",
            errorMessage: "Please enter a valid Email Address",
          },
        },

        required: ['forename', 'surename', 'birthDate'],
        errorMessage: {
          properties:{
            email: "Please enter a valid Email Address"
          }
          
        }
      },
      uischema: {
        type: 'VerticalLayout',
        elements: [
          {
            type : "HorizontalLayout",
            elements: [
              {
                type: 'Control',
                label: 'Forename(s)',
                scope: '#/properties/forename',
              },
              {
                type: 'Control',
                label: 'Surname',
                scope: '#/properties/surename',
              },
            ]
          },

          {
            type : "HorizontalLayout",
            elements: [
              {
                type: 'Control',
                label: 'Date of Birth',
                scope: '#/properties/birthDate',
              },

              {
                type: 'Control',
                label: 'Email Address',
                scope: '#/properties/email',
                rule: {
                  effect: "HIDE",
                  condition: {}
                }
              },
            ]
          },

        ],
      },
    };
  },

  methods: {
    onChange(event) {
      this.data = event.data;

      //# Date calculation to get the age
      if(this.data.birthDate){
        let today = new Date();
        let birthDate = new Date(this.data.birthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        this.data.age = age;
      }

      //# Check no more validation error and change some UI look using isFieldsCompleted property
      if(event.errors.length == 0){
        this.isFieldsCompleted = true;
      }

      if(this.data.age && this.data.age < 0){
        this.data.age = 0;
        this.data.birthDate = '';
        this.isFieldsCompleted = false;
      }

      //# If else to show and hide of the email field based on age
      if(this.data.age >= 18){
        this.schema.required.push('email');
        this.uischema.elements[1].elements[1].rule.effect = 'SHOW';

        if(!this.data.email){
          this.isFieldsCompleted = false;
        }
      }else{
        if(this.schema.required.indexOf('email') != -1){
          this.schema.required.splice(this.schema.required.indexOf('email'), 1);
          this.uischema.elements[1].elements[1].rule.effect = 'HIDE';
        }
      }

      if(this.isFieldsCompleted){
        this.$commonUIPProps.value.showMiniDrawer = 1;
      }else{
        this.$commonUIPProps.value.showMiniDrawer = 0;
      }

      //#Log errors
      //console.log(event);
      //console.log(event.errors);
      //console.log(event.errors.length);
    },

    toggleDialog() {
          this.visibleDialog = !this.visibleDialog;
    },

    whenProceed(){
      if(this.data.forename && this.data.surename){
        this.$commonUIPProps.value.fullName = this.data.forename + ' ' + this.data.surename;
      }

      this.visibleDialog = !this.visibleDialog;
    }
  },

  provide() {
    return {
      styles: myStyles,
    };
  },
});

</script>