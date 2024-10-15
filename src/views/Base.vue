<template>
  <AppBar>
    <AppBarSection>
      <KButton @click="handleClick" :svg-icon="menuIcon" :fill-mode="'flat'" />
    </AppBarSection>

    <AppBarSpacer :width="4" />

    <AppBarSection>
      <img :src="Logo" />
    </AppBarSection>

    <AppBarSection>
      <h1 class="logoName">Company Logo</h1>
    </AppBarSection>

    <AppBarSpacer :width="32" />

    <AppBarSection>

    </AppBarSection>

    <AppBarSpacer />

    <AppBarSection class="actions">
      <img :src="searchIco" />
    </AppBarSection>

    <AppBarSection>
      
    </AppBarSection>

    <AppBarSection>
      <Avatar type="image">
        <img :src="kendokaAvatar" />
      </Avatar>
    </AppBarSection>

    <AppBarSection>
        <div>
            <div class="uname">{{ $commonUIPProps.value.fullName }}</div>
            <div class="upos">Position</div>
        </div>
    </AppBarSection>
  </AppBar>

  
  <Drawer
      :expanded="expanded"
      :position="position"
      :mode="mode"
      :mini="$commonUIPProps.value.showMiniDrawer > 0 ? true : false"
      :items="items"
      :item="'CustomItem'"
    >
      
    <template v-slot:CustomItem="{ props }">
        <li  v-if="!props.separator" :class="props.selected ? 'active' : ''">
            <span class="imgIco"><img :src="props.icon" /></span>
            <span class="highlightnote"></span>
            <span class="k-item-text">{{ props.text }}</span>
        </li>
    </template>

      <DrawerContent>
        <router-view />
      </DrawerContent>
    </Drawer>


</template>
<script>
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
  Drawer, 
  DrawerContent
} from '@progress/kendo-vue-layout';
import { Button } from '@progress/kendo-vue-buttons';
import { BadgeContainer } from '@progress/kendo-vue-indicators';
import { bellIcon, menuIcon, clipboardIcon, fileIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-vue-common';

import kendokaAvatar from '../assets/0e809f681890825ca650371f29d7f24c.jpg';
import searchIco from '../assets/search-1@2x.png';
import Logo from '../assets/photography-camera-pictures-image.png';
import firmDetailsIco from '../assets/firm-details.png';
import settignsIco from '../assets/Vector_3.png';
//import firmDetails from '../components/icons/firmDetails.vue';

export default {
  components: {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    Avatar,
    BadgeContainer,
    KButton: Button,
    SvgIcon,
    Drawer, 
    DrawerContent,
  },

  watch: {
    '$commonUIPProps.value.showMiniDrawer': {
      handler(nv, ov) {
        //Do something here when value is changed
      },
      deep: true
    },

    '$commonUIPProps.value.fullName': {
      handler(nv, ov) {
        //Do something here when value is changed
      },
      deep: true
    }
  },

  mounted() {
    this.$router.push(this.items[0].data);
  },
  data() {
    return {
      kendokaAvatar,
      Logo,
      searchIco,
      menuIcon,
      bellIcon,

      items: [
        {
          text: "Manage Info",
          icon: firmDetailsIco,
          selected: true,
          data: {
            path: "/",
          },
        },

        {
          text: "General Settings",
          icon: settignsIco,
          selected: false,
          data: {
            path: "/",
          },
        }
      ],
      expanded: false,
      selectedId: 0,
      position: "start",
      mode: "push",

    };
  },

  methods: {
    handleClick() {
      this.expanded = !this.expanded;
    },
  },
};
</script>