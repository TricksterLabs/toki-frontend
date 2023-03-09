<template>
  <q-card class="bg-transparent no-shadow"
          :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem','height': '23rem','max-height': '23rem'}:{'max-width': '35rem','min-width': '35rem','height': '26rem'}">
    <q-card-section class="row q-col-gutter-sm q-pt-none q-pb-sm" :class="$q.screen.lt.sm?'q-px-none':''">
      <div class="col-12 text-center text-subtitle1" style="padding-top: 0px !important;">
        Info
      </div>
      <div class="col-6">
        <q-input spellcheck="false" outlined v-model="session_data" dense readonly dark color="secondary"
                 class="full-width-right" padding="sm md" label="Session"
        />
      </div>
      <div class="col-6">
        <q-select outlined v-model="market_data_copy.order_transaction_mode" map-options emit-value
                  option-disable="inactive" :options="order_transaction_mode_options"
                  label="Transaction Mode" dense dark @update:model-value="updateCheckpoint" color="secondary"/>
      </div>
      <div class="col-6">
        <q-input outlined model-value="Bitcoin Mainnet" dense readonly dark color="secondary"
                 class="full-width q-mr-sm" padding="sm md" label="Network"
        />
      </div>

      <div class="col-6">
        <q-input outlined
                 v-model="market_data_copy.inscription_padding" dense dark color="secondary"
                 class="full-width q-mr-sm" padding="sm md" label="Inscription Padding" min="546" max="10000"
                 hide-bottom-space
                 :rules="[
                                (v) => !!v || 'Inscription Padding is required',
                                (v) => v >= 546 || 'Inscription Padding should be above 546',
                                (v) => v <= 10000 || 'Inscription Padding should be below 10000',
                              ]"
        />
      </div>
      <div class="col-6">
        <q-input outlined :model-value="order_data.order_file_count+'/'+order_data.order_file_size" dense
                 readonly dark color="secondary"
                 class="full-width q-mr-sm" padding="sm md" label="File Count"
        />
      </div>
      <div class="col-6">
        <q-input outlined :disable="market_data_copy.order_transaction_mode=='Batched'"
                 v-model.number="market_data_copy.inscription_checkpoint_steps" dense dark color="secondary"
                 class="full-width q-mr-sm" padding="sm md" label="Inscription Checkpoint Steps" min="1" max="25"
                 hide-bottom-space
                 :rules="[
                                (v) => !!v || 'Inscription Checkpoint Steps is required',
                                (v) => parseFloat(v) >= 1 || 'Inscription Checkpoint Steps should be above 1',
                                (v) => parseFloat(v) <= 20 || 'Inscription Checkpoint Steps should be below 20',
                                (v) => /^-?\d+$/.test(v) || 'Inscription Checkpoint Steps should be an integer',

                              ]"
        />
      </div>
      <!--      <div class="col-6">-->
      <!--        <q-input outlined :model-value="order_data.order_transaction_type" dense readonly dark-->
      <!--                 color="secondary"-->
      <!--                 class="full-width-right" padding="sm md" input-class="text-capitalize"-->
      <!--                 label="Transaction Type"-->
      <!--        />-->
      <!--      </div>-->
    </q-card-section>
    <q-card-section v-if="!market_data_copy.advance" class="q-pt-none" :class="$q.screen.lt.sm?'q-px-none':''">
      <div class="text-subtitle1 text-center q-pb-sm" style="padding-top: 0px !important;">
        Gas Fee
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col">
          <q-card class="bg-transparent fit no-shadow text-center cursor-pointer gas_fee_border"
                  @mousedown="selectFee('economyFee')" bordered v-ripple
                  :class="market_data_copy.selected_fee==='economyFee'?'active_border':''">
            <q-card-section class="col-12 q-pa-sm">
              Unknown <br/>
            </q-card-section>
            <q-card-section class="q-pt-none card_margin">
              <span class="text-subtitle1 text-weight-bolder">{{ gas_fee_data['economyFee'] }}</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="bg-transparent fit  no-shadow text-center cursor-pointer gas_fee_border"
                  @mousedown="selectFee('hourFee')"
                  bordered v-ripple
                  :class="market_data_copy.selected_fee==='hourFee'?'active_border':''">
            <q-card-section class="col-12 q-pa-sm">
              ~ 1 Hour
            </q-card-section>

            <q-card-section class="q-pt-none card_margin">
              <span class="text-subtitle1 text-weight-bolder">{{ gas_fee_data['hourFee'] }}</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="bg-transparent no-shadow fit   text-center cursor-pointer gas_fee_border"
                  @mousedown="selectFee('halfHourFee')" bordered v-ripple
                  :class="market_data_copy.selected_fee==='halfHourFee'?'active_border':''">
            <q-card-section class="col-12 q-pa-sm">
              ~ 30 Min
            </q-card-section>
            <q-card-section class="q-pt-none card_margin">
              <span class="text-subtitle1 text-weight-bolder">{{ gas_fee_data['halfHourFee'] }}</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="bg-transparent no-shadow fit  text-center cursor-pointer gas_fee_border"
                  @mousedown="selectFee('fastestFee')" bordered v-ripple
                  :class="market_data_copy.selected_fee==='fastestFee'?'active_border':''">
            <q-card-section class="col-12 q-pa-sm">
              ~ 10 Min
            </q-card-section>
            <q-card-section class="q-pt-none card_margin">
              <span class="text-subtitle1 text-weight-bolder">{{ gas_fee_data['fastestFee'] }}</span>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="bg-transparent no-shadow fit  text-center cursor-pointer gas_fee_border"
                  @mousedown="selectFee('Custom')"
                  bordered v-ripple
                  :class="market_data_copy.selected_fee==='Custom'?'active_border':''">
            <q-card-section class="col-12 q-pa-sm">
              Custom <br/>
              <q-input input-class="text-center text-subtitle1 text-weight-bolder" type="text"
                       hide-bottom-space outlined
                       v-model="market_data_copy.custom_fee" dense dark color="secondary"
                       class="" padding="sm md" :min="gas_fee_data['minimumFee']" max="50"
                       :rules="[
                                (v) => !!v || 'Amount is required',
                                (v) => /^\d+(\.\d{1,2})?$/.test(v) || 'Amount should have at most 2 decimal points',
                                (v) => parseFloat(v) >= gas_fee_data['minimumFee'] || 'Amount should be above '+gas_fee_data['minimumFee'],
                                (v) => parseFloat(v) < 50 || 'Amount should be below 50',
                              ]"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none" :class="$q.screen.lt.sm?'q-px-none':''">
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-btn @click="market_data_copy.receiving_mode='Single Address'" color="secondary"
                 :class="market_data_copy.receiving_mode==='Single Address'?'active_item':''"
                 no-caps outline size="md" class="full-width" :label="'Single Address'"/>
        </div>
        <div class="col-6">
          <q-btn @click="market_data_copy.receiving_mode='Multi Address'" color="secondary"
                 no-caps outline
                 :class="market_data_copy.receiving_mode==='Multi Address'?'active_item':''"
                 size="md" class="full-width" :label="'Multi Address'"/>
        </div>
      </div>
      <div v-if="market_data_copy.receiving_mode==='Single Address'">
        <q-input spellcheck="false" outlined v-model.trim="market_data_copy.receiving_address" dense dark
                 color="secondary"
                 class="q-mt-sm" padding="sm md" label="Receiving address"
        />
      </div>
      <div v-if="market_data_copy.receiving_mode==='Multi Address'">
        <template v-for="n in Object.keys(file_data.data)">
          <q-input spellcheck="false" outlined v-model.trim="market_data_copy.receiving_address_multi[n]" dense
                   dark color="secondary"
                   class="q-mt-sm" padding="sm md" :label="'Receiving address - '+n"
          />
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref, defineComponent} from "vue";

export default defineComponent({
  name: "Configure",
  setup() {
    return {
      market_data_copy: ref({}),
      order_transaction_mode_options: [{label: 'Chained', value: 'Chained'}, {
        label: 'Batched',
        value: 'Batched'
      }, {label: 'Collection', value: 'Collection', inactive: true}]
    }
  },
  props: ['session_data', 'market_data', 'file_data', 'gas_fee_data', 'order_data'],
  created() {
    this.market_data_copy = this.market_data
  },
  watch: {
    'market_data_copy': {
      handler: function (newval, old_val) {
        this.$emit('update_market_data', this.market_data_copy)
      },
      deep: true
    },
    'market_data': {
      handler: function (newval, old_val) {
        this.market_data_copy = this.market_data
      },
      deep: true
    }
  },
  methods: {
    selectFee(item) {
      this.market_data_copy.selected_fee = item
    },
    updateCheckpoint() {
      if (this.market_data_copy.order_transaction_mode === 'Batched') {
        this.market_data_copy.inscription_checkpoint_steps = 1
      }
      if (this.market_data_copy.order_transaction_mode === 'Chained') {
        this.market_data_copy.inscription_checkpoint_steps = 20
      }
    }
  },
  emits: ['update_market_data']
})
</script>

<style scoped>

</style>
