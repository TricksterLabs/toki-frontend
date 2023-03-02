<template>
  <q-page class="flex flex-center" style="background: linear-gradient(to right, #202D2E, #303428)">
    <q-card class="no-shadow bg-transparent item_style" style="border: 1px solid grey"
            :style="$q.screen.lt.sm?{'width':'96%'}:{}">
      <q-card-section class="text-white">
        Refer Page
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router';

export default defineComponent({
  name: 'ReferPage',
  setup() {
    const route = useRoute();
    const router = useRouter();

    return {
      route,
      router
    }
  },
  mounted() {
    let referral = this.$q.localStorage.getItem('referral')
    if(!referral){
      this.$q.localStorage.set("referral", this.$route.params.address);
      this.$router.push('/')
    }
    else{
      this.$router.push('/')
    }
    // console.log(this.$route.params.address)
  }
})
</script>

<style>
.item_style {
  border-radius: 12px;
}
</style>
