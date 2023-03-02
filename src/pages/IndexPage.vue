<template>
  <q-page class="flex flex-center" style="background: linear-gradient(to right, #202D2E, #303428)">
    <q-card class="no-shadow bg-transparent item_style" style="border: 1px solid grey"
            :style="$q.screen.lt.sm?{'width':'96%'}:{}">
      <q-stepper
        v-model="step"
        ref="stepper"
        dark
        class="bg-transparent"
        active-color="accent"
        done-color="secondary"
        animated
      >
        <q-step
          :name="1"
          title="Upload"
          icon="inventory_2"
          :done="step > 1"
        >
          <q-card class="bg-transparent no-shadow" style="height: 28rem;"
                  :style="$q.screen.lt.sm?{'max-width': '21rem','min-width': '21rem'}:{'max-width': '35rem','min-width': '35rem'}">
            <q-card-section class="q-pa-none text-center">
              <q-btn @click="selected_tab='Files'" :class="selected_tab=='Files'?'active_item':''" color="grey-6" no-caps outline size="lg" :label="'Files'"/>
              <q-btn @click="selected_tab='Sns'" :class="selected_tab=='Sns'?'active_item':''" class="q-ml-md" color="grey-6" no-caps outline size="lg" :label="'Sns'"/>
            </q-card-section>

            <div v-if="selected_tab=='Files'">
              <q-card-section class="q-pb-none">
                <div class="text-subtitle1 ">Upload your files to begin, we will inscribe and send them to you:</div>
              </q-card-section>
              <q-card-section class="text-center items-center justify-center">
                <q-uploader class="dropzone no-shadow" ref="file"
                            url="http://localhost:4444/upload"
                            @added="handleAdded"
                            multiple
                >
                  <template v-slot:list="scope">
                    <q-list separator dark>
                      <q-item v-for="file in scope.files.sort(naturalCompare)" :key="file.__key"
                              class="full-width q-my-xs q-pa-md" style="border-color: ">
                        <q-item-section class="text-center">
                          <q-item-label class="full-width text-weight-bolder ellipsis">
                            {{ file.name }}
                          </q-item-label>

                          <q-item-label caption class="text-white">
                            {{ file.__sizeLabel }} / <span v-if="file_data_display.hasOwnProperty(file.name)"> {{
                              file_data_display[file.name]['contentType']
                            }}</span>
                            <!--                / {{ file.__progressLabel }}-->
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    <q-item-section class="drag-drop" v-if="scope.files.length==0">
                      <q-item-label>
                        <q-icon name="cloud_upload" class="cursor-pointer" size="100px" @click="$refs.file.pickFiles()"
                                color="white"/>
                        <div>{{ dropzoneText }}</div>
                      </q-item-label>
                    </q-item-section>

                  </template>
                </q-uploader>
              </q-card-section>
            </div>
            <div v-if="selected_tab=='Sns'">
              <q-card-section>
                <div class="text-subtitle1 ">Add your .sats names below, each one on a new line.</div>
              </q-card-section>
              <q-card-section class="text-center items-center justify-center">
                <q-input
                  type="textarea" color="secondary"
                  v-model="snstext" outlined dark
                  @keyup.enter="snsTextProcess"
                />
              </q-card-section>
<!--              <q-card-section>-->
<!--                <q-list>-->
<!--                  <q-item-label header class="text-white text-subtitle1">Items</q-item-label>-->
<!--                  <template v-for="(item, item_index) in sns_array_data">-->
<!--                    <q-item class="rounded-borders bg-transparent q-my-sm active_border_secondary">-->
<!--                      <q-item-section side class="text-white">-->
<!--                        {{ item_index + 1 }}-->
<!--                      </q-item-section>-->
<!--                      <q-item-section :class="sns_array_status.hasOwnProperty(item)?'text-positive text-wright-bolder':''">-->
<!--                        {{ item }}-->
<!--                      </q-item-section>-->
<!--                    </q-item>-->
<!--                  </template>-->
<!--                </q-list>-->
<!--              </q-card-section>-->
            </div>
          </q-card>
        </q-step>

        <q-step
          :name="2"
          title="Configure"
          icon="info"
          :done="step > 2" class=""
        >
          <q-card class="bg-transparent no-shadow" style="height: 28rem;"
                  :style="$q.screen.lt.sm?{'max-width': '21rem','min-width': '21rem'}:{'max-width': '35rem','min-width': '35rem'}">
            <q-card-section class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input outlined v-model="session_data.session" dense readonly dark color="grey-5"
                         class="full-width-right" padding="sm md" label="Session"
                />
              </div>
              <div class="col-6">
                <q-input outlined v-model="session_data.order_id" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="Order Id"
                />
              </div>
              <div class="col-6">
                <q-input outlined model-value="Bitcoin Mainnet" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="Network"
                />
              </div>
              <div class="col-6">
                <q-input outlined :model-value="session_data.order_file_count" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="File Count"
                />
              </div>
              <div class="col-6">
                <q-input outlined :model-value="session_data.order_transaction_type" dense readonly dark color="grey-5"
                         class="full-width-right" padding="sm md" input-class="text-capitalize" label="Transaction Type"
                />
              </div>
              <div class="col-6">
                <q-input outlined model-value="546" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="Inscription Padding"
                />
              </div>
            </q-card-section>
            <q-card-section v-if="!market_data.advance" class="q-pt-none">
              <div class="text-subtitle1 ">
                Gas Fee
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col">
                  <q-card class="bg-transparent fit no-shadow text-center cursor-pointer"
                          @click="selectFee('economyFee')" bordered v-ripple
                          style="border: 1px #9e9e9e solid"
                          :class="market_data.selected_fee==='economyFee'?'active_border':''">
                    <q-card-section class="col-12 q-pa-sm">
                      ~ Got Time <br/>
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <span>{{ gas_fee_data['economyFee'] }}</span>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card class="bg-transparent fit  no-shadow text-center cursor-pointer" @click="selectFee('hourFee')"
                          bordered v-ripple
                          style="border: 1px #9e9e9e solid"
                          :class="market_data.selected_fee==='hourFee'?'active_border':''">
                    <q-card-section class="col-12 q-pa-sm">
                      ~ 1 Hour
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <span>{{ gas_fee_data['hourFee'] }}</span>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card class="bg-transparent no-shadow fit   text-center cursor-pointer"
                          @click="selectFee('halfHourFee')" bordered v-ripple
                          style="border: 1px #9e9e9e solid"
                          :class="market_data.selected_fee==='halfHourFee'?'active_border':''">
                    <q-card-section class="col-12 q-pa-sm">
                      ~ 30 Min
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <span>{{ gas_fee_data['halfHourFee'] }}</span>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card class="bg-transparent no-shadow fit  text-center cursor-pointer"
                          @click="selectFee('fastestFee')" bordered v-ripple
                          style="border: 1px #9e9e9e solid"
                          :class="market_data.selected_fee==='fastestFee'?'active_border':''">
                    <q-card-section class="col-12 q-pa-sm">
                      ~ 10 Min
                    </q-card-section>
                    <q-card-section class="q-pt-none">
                      <span>{{ gas_fee_data['fastestFee'] }}</span>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col">
                  <q-card class="bg-transparent no-shadow fit  text-center cursor-pointer" @click="selectFee('Custom')"
                          bordered v-ripple
                          style="border: 1px #9e9e9e solid"
                          :class="market_data.selected_fee==='Custom'?'active_border':''">
                    <q-card-section class="col-12 q-pa-sm">
                      Custom <br/>
                      <q-input input-class="text-center" type="text" hide-bottom-space outlined
                               v-model="market_data.custom_fee" dense dark color="grey-5"
                               class="" padding="sm md" min="1" max="50"
                               :rules="[ val => val<50 || 'Please select vlue between 1 and 50']"
                      />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-radio color="accent" dark v-model="market_data.receiving_mode" val="Single Address"
                           label="Single Address"/>
                </div>
                <div class="col-6">
                  <q-radio color="accent" dark v-model="market_data.receiving_mode" val="Multi Address" label="Multi Address"/>
                </div>
              </div>
              <div v-if="market_data.receiving_mode==='Single Address'">
                <q-input outlined v-model.trim="market_data.receiving_address" dense dark color="grey-5"
                         class="q-mt-sm" padding="sm md" label="Receiving address"
                />
              </div>
              <div v-if="market_data.receiving_mode==='Multi Address'">
                <template v-for="n in Object.keys(file_data.data)">
                  <q-input outlined v-model.trim="market_data.receiving_address_multi[n]" dense dark color="grey-5"
                           class="q-mt-sm" padding="sm md" :label="'Receiving address - '+n"
                  />
                </template>
              </div>
            </q-card-section>
<!--            <q-card-section class="text-center">-->
<!--              <div class="text-white text-h5 text-weight-bolder">-->
<!--                Final Amount - {{ getAmount }}-->
<!--              </div>-->
<!--            </q-card-section>-->
          </q-card>
        </q-step>

        <q-step
          :name="3"
          title="Payment"
          icon="payment"
        >
          <q-card class="bg-transparent no-shadow" style="height: 28rem;"
                  :style="$q.screen.lt.sm?{'max-width': '21rem','min-width': '21rem'}:{'max-width': '35rem','min-width': '35rem'}">
            <q-card-section class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input outlined v-model="session_data.session" dense readonly dark color="grey-5"
                         class="full-width-right" padding="sm md" label="Session"
                />
              </div>
              <div class="col-6">
                <q-input outlined v-model="session_data.order_id" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="Order Id"
                />
              </div>

              <div class="col-12 q-mt-md">
                <q-input outlined v-model="market_response.serviceAddress" readonly dense dark input-class=""
                         class="q-mr-sm" padding="sm md" @click="copyContent(market_response.serviceAddress)" label="Bitcoin Address" color="accent"
                >
                </q-input>
              </div>
              <div class="col-6 q-mt-md">
                <q-input outlined :model-value="market_response.amount/100000000" dense readonly dark color="grey-5"
                         class="full-width-right" padding="sm md" label="Amount (BTC)"
                />
              </div>
              <div class="col-6 q-mt-md">
                <q-input outlined :model-value="market_response.amount" dense readonly dark color="grey-5"
                         class="full-width q-mr-sm" padding="sm md" label="Amount (Satoshi)"
                />
              </div>
            </q-card-section>

<!--            <q-item class="full-width">-->
<!--              <q-item-section>-->
<!--                <q-item-label class="q-mb-sm text-grey-5">Amount</q-item-label>-->
<!--                <q-input outlined :model-value="getAmount" readonly dense dark color="grey-5"-->
<!--                         class="float-right q-mr-sm" padding="sm md"-->
<!--                >-->
<!--                  <template v-slot:after>-->
<!--                    <q-btn round dense flat icon="content_copy" @click="copyContent(getAmount)">-->
<!--                      <q-tooltip>-->
<!--                        Copy Amount-->
<!--                      </q-tooltip>-->
<!--                    </q-btn>-->
<!--                  </template>-->
<!--                </q-input>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
          </q-card>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="text-center col-12 q-pb-md" :class="step === 2?'q-mb-md':''">
            <q-btn v-if="step > 1" color="deep-orange" outline @click="clearData" label="Clear" no-caps size="lg"
                   class="q-mr-sm float-left"/>

            <q-btn :disable="Object.keys(file_data['data']).length==0" @click="firstSampleRequest" color="grey-6" no-caps outline size="lg"
                   v-if="step === 1" :label="'Next'"/>

            <span class="text-white text-h5 text-weight-bolder" v-if="step === 2">
                Final Amount - {{ getAmount }}
            </span>

            <q-btn
              :disable="(market_data.receiving_mode === 'Single Address'? !market_data.receiving_address :
               Object.values(market_data.receiving_address_multi).length==0)"
              @click="makeTransaction" color="grey-6" no-caps outline size="lg"
              v-if="step === 2" :label="'Next'" class="float-right"/>

            <q-btn :disable="fileList.length==0"  class="float-right q-mb-md"
              @click=""  color="grey-6" no-caps outline size="lg"
                   v-if="step === 3" :label="'Finish'"/>
          </q-stepper-navigation>
        </template>
      </q-stepper>

    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useQuasar} from 'quasar'
import axios from 'axios'
import Market from "components/Market.vue";
import naturalCompare from "natural-compare";
import {copyToClipboard} from 'quasar';

export default defineComponent({
  name: 'IndexPage',
  components: {Market},
  setup() {
    const $q = useQuasar();
    return {
      $q,
      fileList: ref([]),
      step: ref(1),
      files: ref([]),
      uploadUrl: '/api/upload',
      order_id: ref('234534212345ty54321234532ewfsdf'),
      bitcoin_address: ref('2435465u6tyjghfdsaw21345yrtgfds'),
      name: ref(''),
      address: ref(''),
      amount: ref('1300'),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      dropzoneText: 'Drag and drop files here or click to select files',
      file_data: ref({data: {}}),
      file_data_display: ref({}),
      order_data: {},
      transaction_mode: ref(''),
      gas_fee_data: ref({}),
      market_data: ref({
        advance: false,
        custom_fee: 10,
        padding: 546,
        receiving_address_multi: {},
        receiving_mode: 'Single Address',
        selected_fee: 'halfHourFee'
      }),
      session_data: ref({}),
      market_response: ref({}),
      fee_mapping_dict: {"High": "fastestFee", "Medium": "halfHourFee", "Low": "hourFee"},
      selected_tab: ref('Files'),
      snstext: ref(''),
      sns_array_data: ref([]),
      sns_array_status: ref({})
    }
  },
  mounted() {
    this.session_data = this.$q.localStorage.getItem("session_data");
    this.getGasFeeData();
    setInterval(() => {
      this.getGasFeeData()
    }, 1000 * 60);
  },
  methods: {
    snsTextProcess(){
      this.sns_array_data = this.snstext.split('\n').map(line => line.trim()).filter(line => line.endsWith('.sats') && line.length > 0);

      this.sns_array_data.forEach((input, index) => {
        const dict = {
          p: 'sns',
          op: 'reg',
          name: input
        };
        const rawData = Buffer.from(JSON.stringify(dict, null, 2));
        this.file_data['data'][(index + 1).toString() + ".txt"] = {
          contentType: 'text/plain;charset=utf-8',
          rawData: rawData,
        };
        // try {
        //   const response = axios.get('https://api.sats.id/names/' + input).then(function (response) {
        //     this.sns_array_status[input] = true
        //   }.bind(this)).catch(error => {
        //     console.error(error)
        //   });
        //
        //   console.log(response)
        // } catch (error) {
        //   console.log(error)
        //   // this.sns_array_status[input] = false
        // }
      });
      console.log(this.file_data)

    },
    clearData() {
      this.fileList = [];
      this.$q.localStorage.set("session_data", {});
      this.market_data = {
        advance: false,
        custom_fee: 10,
        padding: 546,
        receiving_address_multi: {},
        receiving_mode: 'Single Address',
        selected_fee: 'halfHourFee'
      }
      this.$refs.stepper.goTo(1);
    },
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
    getGasFeeData() {
      try {
        const response = axios.get('https://mempool.space/api/v1/fees/recommended').then(function (response) {
          this.gas_fee_data = response.data;
        }.bind(this));
      } catch (error) {
        console.error(error);
      }
    },
    selectFee(item) {
      let mapping_dict = {"High": "fastestFee", "Medium": "halfHourFee", "Low": "hourFee"}
      this.market_data.selected_fee = item
      this.market_data.fee = this.gas_fee_data[mapping_dict[item]]
    },
    handleDrop(event) {
      event.preventDefault();
      let files = event.dataTransfer.files;
      this.addFiles(files);
    },
    handleAdded(files) {
      this.addFiles(files);
    },
    addFiles(files) {
      this.fileList = this.fileList || [];
      files.forEach(file => {
        if (!this.fileList.includes(file)) {
          this.fileList.push(file);
        }
      });
      // this.fileList = files
      this.fileList.sort(naturalCompare);

      let self = this;
      self.file_data['data'] = {}
      this.fileList.filter(async function (item) {
        const file = item;
        const fileData = await file.arrayBuffer();
        const rawData = Buffer.from(fileData);
        const decoder = new TextDecoder();
        const content = decoder.decode(rawData);
        console.log(content);
        const contentType = item.type + ';charset=' + decoder.encoding;
        // const contentType = mime.lookup(file, { charset: 'utf-8' }) || 'application/octet-stream';
        // let contentType = mime.contentType(mime.lookup(item)) || 'application/octet-stream';
        // contentType = contentType.replace(/\s/g, '');
        self.file_data['data'][item.name] = {
          contentType: contentType,
          rawData: rawData,
        };
        self.file_data_display[item.name] = {
          contentType: contentType,
        };

        return item;
      });

    },
    getContentType(item) {
      // const fileData = await item.arrayBuffer();
      // const rawData = Buffer.from(fileData);
      // const decoder = new TextDecoder();
      // const content = decoder.decode(rawData);
      // let contentType = item.type + ';charset=' + decoder.encoding;
      return item.type
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    async firstSampleRequest() {

      if(this.session_data){
        this.file_data["session"] = this.session_data.session
      }
      let referral = this.$q.localStorage.getItem('referral')
      if(referral){
        this.file_data["referral"] = referral
      }

      try {
        const response = await this.$api.post('/initiate', this.file_data, {
          headers: {'Cache-Control': 'no-cache'},
          cache: 'no-cache'
        });
        const json = response.data;
        this.order_data = response.data;
        this.$q.localStorage.set("session_data", response.data)
        this.session_data = this.$q.localStorage.getItem("session_data")
        console.log(json);
        this.$refs.stepper.next()
      } catch (error) {
        console.error(error.message + ": " + error.response.data);
      }
    },
    async makeTransaction() {
      let single_address = []
      let self = this;
      if(this.market_data.receiving_mode === 'Single Address'){
        this.fileList.filter(function (item) {
          single_address.push(self.market_data.receiving_address)
          return item
        })
      }

      let addresses = this.market_data.receiving_mode === 'Single Address' ? single_address : Object.values(this.market_data.receiving_address_multi);
      try {
        let data = {
          session: this.session_data.session,
          order_id: this.session_data.order_id,
          network: "btc-mainnet",
          order_vbytes_cost: parseFloat((this.market_data.selected_fee !== 'Custom' ? this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)),
          customer_addresses: addresses,
          order_dust_val: 546,
          //
          //   'bc1pmp6vczk548g4dzyldean0vklqexpgvg69s425pdrw7dr2f39j93secucmm',
          // ]
        }

        let referral = this.$q.localStorage.getItem('referral')
        if(referral){
          data["referral"] = referral
        }

        console.log(data)
        const response = await this.$api.post('/submit', data, {
          headers: {'Cache-Control': 'no-cache'},
          cache: 'no-cache'
        });
        const json = response.data;
        this.market_response = response.data;
        console.log(json);
        this.$q.notify({
          type: 'positive',
          message: 'Final Response Success'
        });
        this.$refs.stepper.next()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response.data
        })
        console.error(error.message + ": " + error.response.data);
      }
    }
  },
  computed: {
    getAmount() {
      let fee = (this.market_data.selected_fee !== 'Custom' ? this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)
      if (!fee) {
        return 0
      }
      // parseInt((this.session_data.order_vbytes_count * (this.market_data.selected_fee!='Custom'?gas_fee_data[this.market_data.selected_fee]:this.market_data.custom_fee)) * 1.25 + this.session_data.order_file_count * 25546
      return parseInt((this.session_data.order_vbytes_count * fee) * 1 + this.session_data.order_file_count * 546 + 2500);
    }
  }
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

.active_item {
  color: #00e676 !important;
}

.active_border {
  border: 1px #00e676 solid !important;
}

.active_border_secondary {
  border: 1px #26A69A solid !important;
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


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  opacity: 0.2;
  width: 4px;
  display: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 230, 118, 0.31);
  width: 4px;
}

.final_amount_class{
  background: -webkit-linear-gradient(#c7d2fe, #38bdf8, #c7d2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
