<template>
  <q-page class="full-height q-pa-sm" style="background: linear-gradient(to right, #202D2E, #303428)">
    <div class="row q-col-gutter-sm text-white">
      <div class="col-12">
        <q-card class="bg-transparent no-shadow">
          <q-card-section v-if="!$q.screen.lt.sm">
            <q-btn @click="" class="" color="grey-6" no-caps outline
                   label="Sell"/>

            <q-btn @click="" class="q-ml-sm" color="grey-6" no-caps outline
                   label="How to Buy"/>


            <q-btn @click="" class="float-right" color="grey-6" no-caps outline padding="sm md"
                   label="Filter"/>
            <q-btn @click="" class="float-right q-mr-sm" color="grey-6" no-caps outline padding="sm md"
                   label="Sort"/>


            <q-input outlined v-model="market_search" dense dark color="grey-5"
                     class="float-right q-mr-sm" padding="sm md" style="width: 21rem"
            />

          </q-card-section>

          <q-card-section v-if="$q.screen.lt.sm" class="row q-pb-none">
            <div class="col-6">
              <q-btn @click="" class="full-width" color="grey-6" no-caps outline
                     label="Sell"/>
            </div>
            <div class="col-6 q-pl-sm">
              <q-btn @click="" class=" full-width" color="grey-6" no-caps outline
                     label="How to Buy"/>
            </div>
          </q-card-section>

          <q-card-section v-if="$q.screen.lt.sm" class="col-12">
            <q-input outlined v-model="market_search" dense dark color="grey-5"
                     class="float-left q-mr-sm" padding="sm md" style="width: 12.5rem"
            />

            <q-btn @click="" class="float-right" color="grey-6" no-caps outline padding="sm md"
                   label="Filter"/>
            <q-btn @click="" class="float-right q-mr-sm" color="grey-6" no-caps outline padding="sm md"
                   label="Sort"/>

          </q-card-section>
        </q-card>
      </div>
      <template v-for="n in 20">
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <market></market>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useQuasar} from 'quasar'
import Market from "components/Market.vue";

export default defineComponent({
  name: 'MarketPage',
  components: {Market},
  setup() {
    const $q = useQuasar();
    return {
      $q,
      market_search: ref(''),
    }
  },
})
</script>

<style>
.drag-drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem;
}

.dropzone {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: transparent;
  margin-bottom: 16px;

}

@media screen and (max-width: 390px) {
  .dropzone {
    width: 94%;
  }
}

.drag-drop-text {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.file-list {
  width: 400px;
}

.upload-button {
  margin-top: 16px;
}

.q-uploader__header-content {
  display: none !important;
}

.item_style {
  border-radius: 12px;
}
</style>
