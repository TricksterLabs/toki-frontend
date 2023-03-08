<template>
  <q-page class="flex flex-center" style="background: linear-gradient(to right, #202D2E, #303428)">
    <div class="row">
<!--      <div class="text-center text-white col-12 text-caption text-italic">-->
<!--        toki - the most advanced inscription machine on bitcoin-->
<!--      </div>-->
      <q-card class="no-shadow  bg-transparent item_style" :class="$q.screen.lt.sm?'q-ml-sm':'offset-2'"
              style="border: 1px solid #26A69A"
              :style="$q.screen.lt.sm?{'width':'96%'}:{}">
        <q-stepper
          v-model="step"
          ref="stepper"
          dark
          class="bg-transparent"
          active-color="info"
          done-color="info"
          inactive-color="secondary"
          animated
        >
          <q-step
            :name="1"
            :title="$q.screen.lt.sm?'':'Upload'"
            icon="upload"
            done-icon="upload"
            active-icon="upload"
            :done="step > 1"
          >
            <upload @update_clear_inner_child_data="clear_inner_child_data=$event" @update_file_data="file_data=$event"
                    :clear_inner_child_data="clear_inner_child_data"></upload>
          </q-step>

          <q-step
            :name="2"
            :title="$q.screen.lt.sm?'':'Configure'"
            icon="info"
            done-icon="info"
            active-icon="info"
            :done="step > 2" class=""
          >
            <configure @update_market_data="market_data=$event" :session_data="session_data" :file_data="file_data"
                       :gas_fee_data="gas_fee_data" :order_data="order_data" :market_data="market_data"
                       :clear_inner_child_data="clear_inner_child_data"
                       @update_clear_inner_child_data="clear_inner_child_data=$event"></configure>
          </q-step>

          <q-step
            :name="3"
            :title="$q.screen.lt.sm?'':'Payment'"
            icon="payments"
            done-icon="payments"
            active-icon="payments"
          >
            <payment :session_data="session_data" :orderCommitHash="orderCommitHash" :message="message"
                     :market_response="market_response" :order_data="order_data"></payment>
          </q-step>

          <template v-slot:navigation>
            <q-separator color="secondary" class=""></q-separator>
            <q-stepper-navigation class="text-center row" style="padding-bottom: 0px !important;">

              <div class="col-12" v-if="!$q.screen.lt.sm">

                <q-btn v-if="step > 1 && step!==3" color="deep-orange" outline @click="clearData" label="Clear" no-caps
                       size="lg"
                       class="q-mb-sm q-mt-sm float-left"/>

                <div class="text-white full-width text-subtitle1 q-mt-sm" v-if="step === 2">
                  <span class="" style="margin-right: 65px">Final Amount </span><br/> <span class="amount_style"><span
                  class="text-weight-bolder" v-if="bitcoin_price.hasOwnProperty('bitcoin')">{{
                    getAmount
                  }} Sat </span> ({{
                    parseFloat(getAmount / 100000000 * (this.bitcoin_price.bitcoin.usd)).toFixed(2)
                  }} USD$)</span>


                  <q-btn
                    :disable="(market_data.receiving_mode === 'Single Address'? !market_data.receiving_address :
               Object.values(market_data.receiving_address_multi).length==0)"
                    @click="makeTransaction" color="secondary" no-caps outline size="lg"
                    v-if="step === 2" :label="'Next'" class="float-right" style="margin-top: -28px;"/>
                </div>


                <q-btn :disable="Object.keys(file_data['data']).length==0" @click="firstSampleRequest" color="secondary"
                       no-caps outline size="lg" class="q-mt-sm q-mb-sm"
                       v-if="step === 1" :label="'Next'"/>


                <q-btn v-if="step ===3" color="secondary" outline
                       @click="clearData" label="Inscribe More" no-caps size="lg"
                       class="q-mr-sm q-mb-sm q-mt-sm"/>
              </div>

              <div v-if="$q.screen.lt.sm && step === 2" class="col-12">
                <div class="text-white full-width text-h6 text-weight-bolder">
                  Final Amount<br/> {{
                    getAmount
                  }} Sat({{ parseFloat(getAmount / 100000000 * (this.bitcoin_price.bitcoin.usd)).toFixed(2) }} USD$)

                </div>
              </div>
              <div v-if="$q.screen.lt.sm && step === 2" class="col-12 q-mb-sm q-mt-sm">
                <q-btn v-if="step > 1 && step!=3" color="deep-orange" outline @click="clearData" label="Clear" no-caps
                       size="lg"
                       class="float-left"/>

                <q-btn
                  :disable="(market_data.receiving_mode === 'Single Address'? !market_data.receiving_address :
               Object.values(market_data.receiving_address_multi).length==0)"
                  @click="makeTransaction" color="secondary" no-caps outline size="lg"
                  v-if="step === 2" :label="'Next'" class="float-right"/>
              </div>

              <div v-if="$q.screen.lt.sm && (step === 1 || step===3)" class="col-12 text-center">
                <q-btn :disable="Object.keys(file_data['data']).length==0" @click="firstSampleRequest" color="secondary"
                       no-caps outline size="lg" class="q-mt-sm q-mb-sm"
                       v-if="step === 1" :label="'Next'"/>


                <q-btn v-if="step ===3 && message=='Order is still being processed...'" color="secondary" outline
                       @click="clearData" label="Inscribe More" no-caps size="lg"
                       class="q-mr-sm float-left q-mb-sm q-mt-sm"/>
              </div>

            </q-stepper-navigation>
          </template>
        </q-stepper>

      </q-card>
      <div class="text-center col-12 text-white q-mt-sm">
        <q-btn label="Faq" @click="faq=true" flat></q-btn>
        <q-btn label="Orders" @click="getOrderData" class="q-mx-md" flat ></q-btn>
        <q-btn label="Session" @click="load_session=true" flat></q-btn>
      </div>
    </div>

    <faq :faq="faq" @update_faq="faq=$event"></faq>
    <orders :orders="orders" @update_orders="orders=$event" :orders_data="orders_data"></orders>
    <load-session @update_session="load_session=$event" :load_session="load_session"></load-session>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useQuasar} from 'quasar'
import axios from 'axios'
import Market from "components/Market.vue";
import Upload from "components/Upload.vue";
import Faq from "components/Dailog/Faq.vue";
import Orders from "components/Dailog/Orders.vue";
import LoadSession from "components/Dailog/LoadSession.vue";
import Payment from "components/Payment.vue";
import Configure from "components/Configure.vue";

export default defineComponent({
  name: 'IndexPage',
  components: {Configure, Payment, LoadSession, Orders, Faq, Upload, Market},
  setup() {
    const $q = useQuasar();
    return {
      $q,
      step: ref(1),
      files: ref([]),
      orders_data: ref([]),
      message: ref(''),
      file_data: ref({data: {}}),
      order_data: {},
      transaction_mode: ref(''),
      gas_fee_data: ref({}),
      market_data: ref({
        advance: false,
        custom_fee: 10,
        padding: 546,
        receiving_address_multi: {},
        receiving_mode: 'Single Address',
        selected_fee: 'halfHourFee',
        order_transaction_mode: 'Chained',
        inscription_padding: 546,
        inscription_checkpoint_steps: 20
      }),
      session_data: ref({}),
      market_response: ref({}),
      fee_mapping_dict: {"High": "fastestFee", "Medium": "halfHourFee", "Low": "hourFee"},
      orderCommitHash: ref(""),
      faq: ref(false),
      orders: ref(false),
      load_session: ref(false),
      clear_inner_child_data: ref(false),
      bitcoin_price: ref({bitcoin: {usd: 20000}})
    }
  },
  created() {
    this.getGasFeeData();
    this.getBitcoinPrice();
  },
  mounted() {
    this.session_data = this.$q.localStorage.getItem("session_data");
    setInterval(() => {
      this.getGasFeeData()
    }, 1000 * 60);
    setInterval(() => {
      this.getBitcoinPrice()
    }, 1000 * 60);
  },
  methods: {
    getBitcoinPrice() {
      try {
        const response = axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(function (response) {
          this.bitcoin_price = response.data;
        }.bind(this)).catch(function (error) {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'negative',
            message: error.response.data
          });
        }.bind(this));
      } catch (error) {
        console.error(error);
      }
    },
    getOrderData() {
      try {
        this.$q.loading.show({
          message: 'Fetching Orders data. Hang on...'
        })

        const response = axios.get('https://api.inscribe.to.ki/orders/' + this.session_data).then(function (response) {
          this.orders_data = response.data;
          this.orders_data.sort((a, b) => b.order_id - a.order_id);
          this.orders = true
          this.$q.loading.hide();
        }.bind(this)).catch(function (error) {
          this.$q.loading.hide();
          this.$q.notify({
            type: 'negative',
            message: error.response.data
          });
        }.bind(this));

      } catch (error) {
        console.error(error);
        this.$q.loading.hide();
      }
    },
    clearData() {
      // this.$q.localStorage.set("session_data", {});
      this.market_data = {
        advance: false,
        custom_fee: 10,
        padding: 546,
        receiving_address_multi: {},
        receiving_mode: 'Single Address',
        selected_fee: 'halfHourFee',
        order_transaction_mode: 'Chained',
        inscription_padding: 546,
        inscription_checkpoint_steps: 20
      }
      this.message = '';
      this.file_data['data'] = {}
      this.clear_inner_child_data = true
      this.$refs.stepper.goTo(1);
    },
    getGasFeeData() {
      // this.$q.loading.show();
      try {
        const response = axios.get('https://mempool.space/api/v1/fees/recommended').then(function (response) {
          this.gas_fee_data = response.data;
          // this.$q.loading.hide();
        }.bind(this));
      } catch (error) {
        console.error(error);
        // this.$q.loading.hide();
      }
    },
    selectFee(item) {
      let mapping_dict = {"High": "fastestFee", "Medium": "halfHourFee", "Low": "hourFee"}
      this.market_data.selected_fee = item
      this.market_data.fee = this.gas_fee_data[mapping_dict[item]]
    },
    async firstSampleRequest() {
      this.session_data = this.$q.localStorage.getItem("session_data");
      if (this.session_data) {
        this.file_data["session"] = this.session_data
      }
      let referral = this.$q.localStorage.getItem('referral')
      if (referral) {
        this.file_data["referral"] = referral
      }

      try {
        this.$q.loading.show();
        const response = await this.$api.post('/estimate', this.file_data, {
          headers: {'Cache-Control': 'no-cache'},
          cache: 'no-cache'
        });
        const json = response.data;
        this.order_data = response.data;
        // this.$q.localStorage.set("session_data", response.data.session)
        // this.session_data = this.$q.localStorage.getItem("session_data")
        this.$refs.stepper.next();
        this.$q.loading.hide();
      } catch (error) {
        console.error(error.message + ": " + error.response.data);
        this.$q.loading.hide();
      }
    },
    async makeTransaction() {
      let single_address = []
      let self = this;
      if (this.market_data.receiving_mode === 'Single Address') {
        Object.keys(this.file_data['data']).filter(function (item) {
          single_address.push(self.market_data.receiving_address)
          return item
        })
      }

      let addresses = this.market_data.receiving_mode === 'Single Address' ? single_address : Object.values(this.market_data.receiving_address_multi);
      try {
        let data = {
          data: this.file_data['data'],
          session: this.session_data,
          network: "btc-mainnet",
          order_vbytes_cost: parseFloat((this.market_data.selected_fee !== 'Custom' ? this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)),
          customer_addresses: addresses,
          order_dust_val: 546,
          order_transaction_mode: this.market_data.order_transaction_mode.toLowerCase(),
          order_checkpoint_steps: this.market_data.inscription_checkpoint_steps,
          //
          //   'bc1pmp6vczk548g4dzyldean0vklqexpgvg69s425pdrw7dr2f39j93secucmm',
          // ]
        }

        let referral = this.$q.localStorage.getItem('referral')
        if (referral) {
          data["referral"] = referral
        }

        this.$q.loading.show();
        const response = await this.$api.post('/submit', data, {
          headers: {'Cache-Control': 'no-cache'},
          cache: 'no-cache'
        });
        const json = response.data;
        this.market_response = response.data;
        this.$q.localStorage.set("session_data", response.data.session)
        this.session_data = this.$q.localStorage.getItem("session_data")
        this.$q.notify({
          type: 'positive',
          message: 'Final Response Success'
        });
        this.$refs.stepper.next()
        this.$q.loading.hide();
        this.checkOrderStatus();
        setInterval(this.checkOrderStatus, 30000);
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response.data
        })
        console.error(error.message + ": " + error.response.data);
      }
    },
    checkOrderStatus() {
      if(this.step=== 3) {
        try {
          // this.$q.loading.show();
          const response = this.$api.get(
            "orders/" + this.session_data + "/" + this.market_response.order_id
          ).then(function (response) {
            const orderInfo = response.data;
            if (response.data.order_commit_hash !== null) {
              this.orderCommitHash = response.data.order_commit_hash;
              this.message = `Congratulations, your order is on its way.`;
            } else {
              this.message = "Order is still being processed...";
            }
            // this.$q.loading.hide();
          }.bind(this));

        } catch (error) {
          console.log(error);
          this.message = "Error checking order status.";
          // this.$q.loading.hide();
        }
      }
    },
  },
  computed: {
    getAmount() {
      let cost = 0
      cost = this.order_data[this.market_data.order_transaction_mode.toLowerCase() + 'Fee']

      let referral = this.$q.localStorage.getItem('referral')
      if (referral) {
        cost = cost + this.order_data[this.market_data.order_transaction_mode.toLowerCase() + 'FeePlusReferral']
      }
      // parseInt((this.session_data.order_vbytes_count * (this.market_data.selected_fee!='Custom'?gas_fee_data[this.market_data.selected_fee]:this.market_data.custom_fee)) * 1.25 + this.session_data.order_file_count * 25546
      return parseInt((parseFloat((this.market_data.selected_fee !== 'Custom' ?
        this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)) * cost) * 1.25 + Object.keys(this.file_data['data']).length * 25546);
    }
  }
})
</script>
