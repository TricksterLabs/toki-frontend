<template>
  <q-card class="bg-transparent no-shadow" style="height: 416px;max-height: 416px"
          :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem'}:{'max-width': '35rem','min-width': '35rem'}">
    <q-card-section class="row q-col-gutter-sm">
      <div class="col-6">
        <q-input spellcheck="false" outlined v-model="session_data" dense readonly dark color="secondary"
                 class="full-width-right" padding="sm md" label="Session" style="padding-top: 12px"
        />
      </div>
      <div class="col-6">
        <q-input outlined v-model="market_response.order_id" dense readonly dark color="secondary"
                 class="full-width q-mr-sm" padding="sm md" label="Order Id" style="padding-top: 12px"
        />
      </div>

      <div class="col-12 text-caption text-italic text-center">
        Send the following amount:
      </div>
      <div class="col-6 custom_input">
        <q-input outlined :model-value="market_response.order_service_cost/100000000" dense readonly dark color="positive"
                 class="full-width-right" padding="sm md" label="Amount (BTC)"
                 @click="copyContent(market_response.order_service_cost/100000000)"
        />
      </div>
      <div class="col-6 custom_input">
        <q-input outlined :model-value="market_response.order_service_cost" dense readonly dark color="positive"
                 class="full-width q-mr-sm" padding="sm md" label="Amount (Satoshi)"
                 @click="copyContent(market_response.order_service_cost)"
        />
      </div>
      <div class="col-12 text-caption text-italic text-center">
        To the following address:
      </div>
      <div class="col-12 custom_input">
        <q-input outlined v-model="market_response.serviceAddress" readonly dense dark input-class=""
                 class="" padding="sm md" @click="copyContent(market_response.serviceAddress)"
                 label="Bitcoin Address" color="positive"
        >
        </q-input>
      </div>
    </q-card-section>

    <q-card-section v-if="message">
      <q-card class="bg-transparent active_border row flex items-center" style="height: 7rem;">
        <q-card-section class="text-center col-12 q-pt-lg text-h6">
          {{ message }}
          <br/>
          <q-spinner-pie v-if="message==='Order is still being processed...'"
                         color="secondary"
                         size="2em"
          />
          <q-btn type="a" v-else :href="'https://mempool.space/tx/'+orderCommitHash" target="_blank" no-caps
                 class="q-ml-sm" outline color="secondary">
            View Transaction
          </q-btn>
        </q-card-section>
      </q-card>
    </q-card-section>


    <div class="text-caption text-italic text-center q-mt-xs">
      Uncontrollable network conditions may affect delivery time.
    </div>
  </q-card>
</template>

<script>
import {copyToClipboard, useQuasar} from "quasar";
import {ref, defineComponent} from "vue";

export default defineComponent({
  name: "Payment",
  setup() {
    const $q = useQuasar();
    return {
      $q,
    }
  },
  props:['session_data','orderCommitHash', 'message', 'market_response', 'order_data'],
  methods: {
    copyContent(text) {
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'Copied to Clipboard'
          })
        })
        .catch(() => {
          // fail
        })
    },
  }
})
</script>

<style scoped>

</style>
