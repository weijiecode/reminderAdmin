<template>
  <div class="mycenter">
    <div class="datashow">
      <DataShow></DataShow>
    </div>
    <div class="adminupdat">
      <AdminUpdate></AdminUpdate>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AdminUpdate from '@/views/mycenter/component/adminupdate.vue';
import DataShow from '@/views/mycenter/component/datashow.vue';

export default defineComponent({
  name: 'MycenterView',
  components: {
    AdminUpdate,
    DataShow
  },
  setup(){
    return {
    }
  }
});
</script>
<style scoped lang="scss">
</style>
