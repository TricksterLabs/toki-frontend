<template>
  <!--    <q-card-section class="row q-col-gutter-sm">-->
  <!--      <div class="col-6">-->
  <!--        <q-btn @click="" class="full-width" color="grey-6" no-caps outline-->
  <!--               label="Sell"/>-->
  <!--      </div>-->
  <!--      <div class="col-6">-->
  <!--        <q-btn @click="" class="full-width" color="grey-6" no-caps outline-->
  <!--               label="How to Buy"/>-->
  <!--      </div>-->
  <!--    </q-card-section>-->
  <!--    <q-card-section class="col-12 q-pt-none">-->
  <!--      <q-input outlined v-model="market_search" dense dark color="grey-5"-->
  <!--               class="float-left q-mr-sm" padding="sm md" style="width: 21rem"-->
  <!--      />-->

  <!--      <q-btn @click="" class="float-right" color="grey-6" no-caps outline padding="sm md"-->
  <!--             label="Filter"/>-->
  <!--      <q-btn @click="" class="float-right q-mr-sm" color="grey-6" no-caps outline padding="sm md"-->
  <!--             label="Sort"/>-->
  <!--    </q-card-section>-->
  <q-card class="card_style q-mt-md bg-transparent no-shadow">
    <q-card-section :horizontal="!$q.screen.lt.sm">
      <q-img class="col" style="border-radius: 12px" :src="'https://picsum.photos/500/300?t=' + Math.random()">
        <div
          class="absolute-top-left-right q-pl-none bg-transparent text-subtitle2 text-accent text-weight-bolder">
          #{{ n }}
        </div>
      </q-img>
      <q-card-section>
        <div class="text-h6">$16,500</div>
        <div class="text-subtitle1">Cost of apartment in town</div>
        <div class="text-subtitle1">New York, USA</div>
      </q-card-section>
      <q-card-section class="items-center justify-center">
        <q-btn label="Buy" outline flat no-caps></q-btn>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref, defineComponent} from "vue";
import {useQuasar} from "quasar";

export default defineComponent({
  name: "Market",
  setup() {

    const $q = useQuasar();
    return {
      market_search: ref(''),
      $q,
      barStyle: {
        backgroundColor: '#00a96e',
      },
    }
  }
})
</script>

<style scoped>

</style>
