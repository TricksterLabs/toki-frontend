<template>
  <q-page class="flex flex-center" style="background: linear-gradient(to right, #202D2E, #303428)">
    <div class="row">
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
            <q-card class="bg-transparent no-shadow" style="height: 26rem;"
                    :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem'}:{'max-width': '35rem','min-width': '35rem'}">
              <q-card-section class="q-pa-none text-center" :class="$q.screen.lt.sm?'q-px-none':''">
                <q-btn @click="selectTab('Files')" :class="selected_tab=='Files'?'active_item':''" color="secondary"
                       no-caps
                       outline size="lg" :label="'Files'"/>
                <q-btn @click="selectTab('Sns')" :class="selected_tab=='Sns'?'active_item':''" class="q-ml-md"
                       color="secondary" no-caps outline size="lg" :label="'SNS'"/>
                <q-btn disable class="q-ml-md"
                      color="secondary" no-caps outline size="lg" :label="'Collection'">
                  <q-tooltip>
                    Coming Soon
                  </q-tooltip>
                </q-btn>
              </q-card-section>

              <div v-if="selected_tab=='Files'">
                <q-card-section class="q-pb-none text-center" :class="$q.screen.lt.sm?'q-px-none':''">
                  <div class="text-subtitle1 ">Upload any file type up to 400KB and total file size of up to 100MB.
                  </div>
                </q-card-section>
                <q-card-section class="text-center items-center justify-center" :class="$q.screen.lt.sm?'q-px-none':''">
                  <q-uploader class="no-shadow remove_padding" ref="file"
                              :class="$q.screen.lt.sm?'dropzone_mobile':'dropzone'"
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
                          <q-icon name="cloud_upload" class="cursor-pointer" size="100px"
                                  @click="$refs.file.pickFiles()"
                                  color="white"/>
                          <div>{{ dropzoneText }}</div>
                        </q-item-label>
                      </q-item-section>

                    </template>
                  </q-uploader>
                </q-card-section>
              </div>
              <div v-if="selected_tab=='Sns'">
                <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center">
                  <div class="text-subtitle1 ">Add your .sats names below, each one on a new line.</div>
                </q-card-section>
                <q-card-section :class="$q.screen.lt.sm?'q-px-none':''"
                                class="text-center items-center q-pt-none justify-center">
                  <!--                <q-input-->
                  <!--                  type="textarea" color="secondary"-->
                  <!--                  v-model="snstext" outlined dark-->
                  <!--                  @keyup.enter="snsTextProcess"-->
                  <!--                />-->
                  <div :class="$q.screen.lt.sm?'textarea_mobile':'textarea'">
                    <div
                      contenteditable="true"
                      ref="editor" spellcheck="false"
                      @keydown.enter="processInput"
                      style="white-space: pre-wrap;padding: 10px;margin-left: -10px;margin-right: -10px"
                      class="editor"
                    >
                    </div>
                  </div>

                  <div>
                    <q-badge color="green" rounded class="q-mr-sm"/>
                    Domain is Free
                    <q-badge color="red" rounded class="q-ml-md"/>
                    <span class="q-ml-sm">Domain is Taken</span>
                    <q-badge color="yellow" rounded class="q-ml-md"/>
                    <span class="q-ml-sm">Could not retrieve data</span>
                  </div>
                  <div class="text-caption text-italic">
                    Data is provided by a third party, accuracy is not guaranteed
                  </div>
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
            :title="$q.screen.lt.sm?'':'Configure'"
            icon="info"
            done-icon="info"
            active-icon="info"
            :done="step > 2" class=""
          >
            <q-card class="bg-transparent no-shadow"
                    :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem','height': '23rem'}:{'max-width': '35rem','min-width': '35rem','height': '26rem'}">
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
                  <q-input outlined v-model="order_data.order_id" dense readonly dark color="secondary"
                           class="full-width q-mr-sm" padding="sm md" label="Order Id"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined model-value="Bitcoin Mainnet" dense readonly dark color="secondary"
                           class="full-width q-mr-sm" padding="sm md" label="Network"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined :model-value="order_data.order_file_count+'/'+order_data.order_file_size" dense readonly dark color="secondary"
                           class="full-width q-mr-sm" padding="sm md" label="File Count"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined :model-value="order_data.order_transaction_type" dense readonly dark color="secondary"
                           class="full-width-right" padding="sm md" input-class="text-capitalize"
                           label="Transaction Type"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined model-value="546" dense readonly dark color="secondary"
                           class="full-width q-mr-sm" padding="sm md" label="Inscription Padding"
                  />
                </div>
              </q-card-section>
              <q-card-section v-if="!market_data.advance" class="q-pt-none" :class="$q.screen.lt.sm?'q-px-none':''">
                <div class="text-subtitle1 text-center q-pb-sm" style="padding-top: 0px !important;">
                  Gas Fee
                </div>
                <div class="row q-col-gutter-sm">
                  <div class="col">
                    <q-card class="bg-transparent fit no-shadow text-center cursor-pointer gas_fee_border"
                            @mousedown="selectFee('economyFee')" bordered v-ripple
                            :class="market_data.selected_fee==='economyFee'?'active_border':''">
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
                            :class="market_data.selected_fee==='hourFee'?'active_border':''">
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
                            :class="market_data.selected_fee==='halfHourFee'?'active_border':''">
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
                            :class="market_data.selected_fee==='fastestFee'?'active_border':''">
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
                            :class="market_data.selected_fee==='Custom'?'active_border':''">
                      <q-card-section class="col-12 q-pa-sm">
                        Custom <br/>
                        <q-input input-class="text-center text-subtitle1 text-weight-bolder" type="text" hide-bottom-space outlined
                                 v-model="market_data.custom_fee" dense dark color="secondary"
                                 class="" padding="sm md" min="1" max="50"
                                 :rules="[
                                (v) => !!v || 'Amount is required',
                                (v) => /^\d+(\.\d{1,2})?$/.test(v) || 'Amount should have at most 2 decimal points',
                                (v) => parseFloat(v) > 0 || 'Amount should be above 1',
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
                    <q-btn @click="market_data.receiving_mode='Single Address'" color="secondary"
                           :class="market_data.receiving_mode==='Single Address'?'active_item':''"
                           no-caps outline size="md" class="full-width" :label="'Single Address'"/>
                  </div>
                  <div class="col-6">
                    <q-btn @click="market_data.receiving_mode='Multi Address'" color="secondary"
                           no-caps outline
                           :class="market_data.receiving_mode==='Multi Address'?'active_item':''"
                           size="md" class="full-width" :label="'Multi Address'"/>
                  </div>
                </div>
                <div v-if="market_data.receiving_mode==='Single Address'">
                  <q-input spellcheck="false" outlined v-model.trim="market_data.receiving_address" dense dark color="secondary"
                           class="q-mt-sm" padding="sm md" label="Receiving address"
                  />
                </div>
                <div v-if="market_data.receiving_mode==='Multi Address'">
                  <template v-for="n in Object.keys(file_data.data)">
                    <q-input spellcheck="false" outlined v-model.trim="market_data.receiving_address_multi[n]" dense dark color="secondary"
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
            :title="$q.screen.lt.sm?'':'Payment'"
            icon="payments"
            done-icon="payments"
            active-icon="payments"
          >
            <q-card class="bg-transparent no-shadow" style="height: 26rem;"
                    :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem'}:{'max-width': '35rem','min-width': '35rem'}">
              <q-card-section class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-input spellcheck="false" outlined v-model="session_data" dense readonly dark color="secondary"
                           class="full-width-right" padding="sm md" label="Session"
                  />
                </div>
                <div class="col-6">
                  <q-input outlined v-model="order_data.order_id" dense readonly dark color="secondary"
                           class="full-width q-mr-sm" padding="sm md" label="Order Id"
                  />
                </div>

                <div class="col-12 q-mt-md custom_input" >
                  <q-input outlined v-model="market_response.serviceAddress" readonly dense dark input-class=""
                           class="q-mr-sm" padding="sm md" @click="copyContent(market_response.serviceAddress)"
                           label="Bitcoin Address" color="positive"
                  >
                  </q-input>
                </div>
                <div class="col-6 q-mt-md custom_input">
                  <q-input outlined :model-value="market_response.amount/100000000" dense readonly dark color="positive"
                           class="full-width-right" padding="sm md" label="Amount (BTC)"
                           @click="copyContent(market_response.amount/100000000)"
                  />
                </div>
                <div class="col-6 q-mt-md custom_input">
                  <q-input outlined :model-value="market_response.amount" dense readonly dark color="positive"
                           class="full-width q-mr-sm" padding="sm md" label="Amount (Satoshi)"
                           @click="copyContent(market_response.amount)"
                  />
                </div>
              </q-card-section>

              <q-card-section v-if="message">
                <q-card class="bg-transparent active_border row flex items-center" style="height: 12rem;">
                  <q-card-section class="text-center col-12 q-pt-lg text-h6">
                    {{ message }}
                    <br/>
                    <q-spinner-pie v-if="message=='Order is still being processed...'"
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

              <!--            <q-item class="full-width">-->
              <!--              <q-item-section>-->
              <!--                <q-item-label class="q-mb-sm text-secondary">Amount</q-item-label>-->
              <!--                <q-input outlined :model-value="getAmount" readonly dense dark color="secondary"-->
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
            <q-separator color="secondary" class=""></q-separator>
            <q-stepper-navigation class="text-center row" style="padding-bottom: 0px !important;">

              <div class="col-12" v-if="!$q.screen.lt.sm">

                <q-btn v-if="step > 1 && step!=3" color="deep-orange" outline @click="clearData" label="Clear" no-caps
                       size="lg"
                       class="q-mb-sm q-mt-sm float-left"/>

                <div class="text-white full-width text-subtitle1" v-if="step === 2">
                  <span class="" style="margin-right: 65px">Final Amount </span><br/> <span class="amount_style"><span class="text-weight-bolder">{{
                    getAmount
                  }} Sat </span> ({{
                    parseFloat(getAmount / 100000000 * (this.bitcoin_price.bitcoin.usd)).toFixed(2)
                  }} USD$)</span>


                  <q-btn
                    :disable="(market_data.receiving_mode === 'Single Address'? !market_data.receiving_address :
               Object.values(market_data.receiving_address_multi).length==0)"
                    @click="makeTransaction" color="secondary" no-caps outline size="lg"
                    v-if="step === 2" :label="'Next'" class="float-right" style="margin-top: -21px;"/>
                </div>


                <q-btn :disable="Object.keys(file_data['data']).length==0" @click="firstSampleRequest" color="secondary"
                       no-caps outline size="lg" class="q-mt-sm q-mb-sm"
                       v-if="step === 1" :label="'Next'"/>


                <q-btn v-if="step ===3 && message=='Order is still being processed...'" color="secondary" outline
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


                <q-btn v-if="step ===3 && message=='Order is still being processed...'" color="deep-orange" outline
                       @click="clearData" label="Inscribe More" no-caps size="lg"
                       class="q-mr-sm float-left q-mb-sm q-mt-sm"/>
              </div>

            </q-stepper-navigation>
          </template>
        </q-stepper>

      </q-card>
      <div class="text-center col-12 text-white q-mt-sm">
        <q-btn label="Faq" @click="faq=true" flat no-caps></q-btn>
        <q-btn label="Orders" @click="getOrderData" class="q-mx-md" flat no-caps></q-btn>
        <q-btn label="Load Session" @click="load_session=true" flat no-caps></q-btn>
      </div>
    </div>

    <q-dialog
      v-model="faq" @hide="referral=false;referral_address=''"
    >
      <q-card dark class="no-shadow dialog_card_style"
              style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
        <q-card-section>
          <div class="text-h6">FAQ</div>
        </q-card-section>
        <q-separator color="secondary"></q-separator>
        <q-card-section class="">
          <q-scroll-area
            style="height: 30rem;"
          >
            <div class="text-subtitle1">
              Who are you?
            </div>
            <div class="text-caption text-secondary">
              We are a group of Bitcoin Ordinal enthusiasts who are trying to make the ecosystem more accessible to the
              masses.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What are Bitcoin Ordinals?
            </div>
            <div class="text-caption text-secondary">
              Bitcoin ordinals are a numbering scheme for satoshis that allows tracking and transferring individual
              sats.
              They are digital assets inscribed on a satoshi, the smallest denomination of Bitcoin. The Ordinals
              Protocol
              allows users to send and receive sats that carry optional extra data such as text, JPEGs, audio or videos
              similar to NFTs.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What services do you offer?
            </div>
            <div class="text-caption text-secondary">
              We currently offer the most advanced inscription service on the market and are working on a number of
              other
              services that will be released in the near future.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What are the limits?
            </div>
            <div class="text-caption text-secondary">
              Bitcoin has a limit of maximum 400kb per transaction. We have a limit of 100mb total order size but if you
              need more than that you can contact us.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What are your fees?
            </div>
            <div class="text-caption text-secondary">
              We charge 0.00025 BTC per file and 25% of the network fees selected.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What is "Chained" transaction type?
            </div>
            <div class="text-caption text-secondary">
              Chained transaction type is automatically selected by our system if you are inscribing less (and
              including)
              than 20 files under 400kb total size. All the inscription transactions are sent immediately after your
              payment
              is in the mempool without waiting for confirmation and without any extra commit transaction unlike the
              official Ordinal Node allows ensuring the absolutely fastest processing time. Furthermore chaining them
              together and adding the gas fee on the last transaction almost guarantees they will be processed at the
              same
              time and in turn receive ordinals with consecutive IDs.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What is "Batched" transaction type?
            </div>
            <div class="text-caption text-secondary">
              Batched transaction type is automatically selected by our system if you don't qualify for a "Chained"
              transaction type. This has an extra commit transaction that sends the funds to multiple reveal addresses.
              After the commit transaction is confirmed all of the reveal transactions are sent at once. This mode
              allows us
              to broadcast tens of thousands of transactions at the same time, all connected to the same parent
              transaction.
            </div>

            <div class="text-subtitle1 q-mt-md">
              Do you offer image compression?
            </div>
            <div class="text-caption text-secondary">
              Image compression usually means a loss of quality for a much lower file size and potentially removing
              alpha
              channels on images with transparency. We encourage each user to reduce their files as much as possible
              using
              various tools found on the internet and to select the quality compression they are comfortable with. We do
              not
              offer any compression services because of this.
            </div>
            <div class="text-subtitle1 q-mt-md">
              What is the referral program?
            </div>
            <div class="text-caption text-secondary">
              We offer a referral program where you can earn 25% of the service profits from each order your referral
              makes.
              To get a valid link you need to click the "Create Referral" button below, type in your bitcoin address and
              you
              will be prompted to tweet about us using the template provided. Once you do that you will be given a
              referral
              link that you can share with your friends. Do not delete the tweet imediatelly after as we do regular
              checks,
              feel free to delete it after a couple of days.
            </div>
            <div class="text-subtitle1 q-mt-md" v-if="!referral">
              <q-btn label="Create Referral" @click="referral=true" padding="sm sm" no-caps dense
                     color="secondary"></q-btn>
            </div>

            <div v-if="referral" class="q-mt-md row">
              <div class="col-md-10 col-lg-10 col-xs-12 col-sm-12">
                <q-input spellcheck="false" outlined v-model="referral_address" dense dark color="secondary"
                         class="full-width-right" padding="sm md" label="Address"
                />
              </div>
              <div class="col-md-2 col-lg-2 col-xs-12 col-sm-12">
                <q-btn label="Referral" padding="sm md" v-if="referral" :class="$q.screen.lt.sm?'q-mt-sm':''"
                       @click="tweet" :disable="!referral_address"
                       class="float-right q-mb-md q-mr-sm" outline no-caps v-close-popup/>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-12 text-teal">
          <q-btn label="OK" class="float-right q-mb-md" outline v-close-popup/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="orders"
    >
      <q-card dark class="no-shadow dialog_card_style"
              style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
        <q-card-section class="col-12">
          <div class="text-h6">
            Orders
            <q-btn icon="close" class="float-right" flat rounded dense v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator color="secondary"></q-separator>
        <q-card-section class="">
          <q-scroll-area
            style="height: 20rem;"
          >
            <q-list class="scroll">
              <template v-for="order in orders_data">
                <q-expansion-item
                  class="shadow-1 overflow-hidden q-my-sm bg-transparent q-mr-md"
                  style="border-radius: 12px"
                  icon="pending_actions"
                  :label="'Order Id - '+order.order_id"
                  header-class="text-white"
                  expand-icon-class="text-white" group="order"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="pending_actions" color="" flat text-color="white"/>
                    </q-item-section>

                    <q-item-section>
                      {{'Order Id - '+order.order_id}}
                    </q-item-section>

                    <q-item-section side class="text-uppercase text-white">
                      {{order.order_status}}
                    </q-item-section>
                  </template>

                  <q-card class="bg-transparent">
                    <q-card-section class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-input outlined v-model="order.order_network" dense readonly dark color="secondary"
                                 class="full-width-right" padding="sm md" label="Order Network"
                        />
                      </div>
                      <div class="col-6">
                        <q-input outlined :model-value="order.order_file_count+'/'+order.order_file_size" dense readonly dark color="secondary"
                                 class="full-width q-mr-sm" padding="sm md" label="Order File Count / File Size"
                        />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="order.order_file_size" dense readonly dark color="secondary"
                                 class="full-width q-mr-sm" padding="sm md" label="Order File Size"
                        />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="order.order_service_cost" dense readonly dark color="secondary"
                                 class="full-width q-mr-sm" padding="sm md" label="Order Service Cost"
                        />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="order.order_service_address" dense readonly dark color="secondary"
                                 class="full-width q-mr-sm" padding="sm md" label="Order Service Address"
                        />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="order.order_commit_hash" dense readonly dark color="secondary"
                                 class="full-width q-mr-sm" padding="sm md" label="Order Commit Hash"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </template>
            </q-list>
          </q-scroll-area>
        </q-card-section>

        <q-card-section class="col-12 text-teal">
          <q-btn label="OK" class="float-right q-mb-md" outline v-close-popup/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="load_session"
    >
      <q-card dark class="no-shadow dialog_card_style"
              style="width: 500px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
        <q-card-section class="col-12">
          <div class="text-h6">Load Session

            <q-btn icon="close" class="float-right" flat rounded dense v-close-popup></q-btn>
          </div>
        </q-card-section>
        <q-separator color="secondary"></q-separator>
        <q-card-section class="">
          <q-input spellcheck="false" outlined v-model="session" dense dark color="secondary"
                   class="full-width-right" padding="sm md" label="Session"
          />
        </q-card-section>

        <q-card-section class="col-12 text-teal">
          <q-btn label="OK" :disable="!session" @click="loadSession" class="float-right q-mb-md" outline/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useQuasar} from 'quasar'
import axios from 'axios'
import Market from "components/Market.vue";
import naturalCompare from "natural-compare";
import {copyToClipboard} from 'quasar';
import mime from 'mime-types';

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
      message: ref(''),
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
      sns_array_status: ref({}),
      text: ref(""),
      orderCommitHash: ref(""),
      faq: ref(false),
      orders: ref(false),
      load_session: ref(false),
      referral: ref(false),
      session: ref(""),
      referral_address: ref(""),
      orders_data: ref([]),
      bitcoin_price: ref({})
    }
  },
  mounted() {
    this.session_data = this.$q.localStorage.getItem("session_data");
    this.getGasFeeData();
    setInterval(() => {
      this.getGasFeeData()
    }, 1000 * 60);

    this.getBitcoinPrice();
    setInterval(() => {
      this.getBitcoinPrice()
    }, 1000 * 60);
  },
  methods: {
    getBitcoinPrice() {
      try {
        const response = axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then(function (response) {
          this.bitcoin_price = response.data;
        }.bind(this));
      } catch (error) {
        console.error(error);
      }
    },
    tweet() {
      const tweetMessage = `To.Ki is a new inscription service. https://to.ki/inscribe/ref/${this.referral_address}`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetMessage
      )}`;
      window.open(tweetUrl);
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

        console.log(response)
      } catch (error) {
        console.error(error);
        this.$q.loading.hide();
      }
    },
    loadSession() {
      this.$q.localStorage.set("session_data", this.session);
      this.session_data = this.session;
      this.session = '';

      this.$q.notify({
        type: 'positive',
        message: 'Session Loaded Successfully'
      });
      this.load_session = false;

    },
    selectTab(tab) {
      this.fileList = [];
      this.file_data['data'] = {};
      this.selected_tab = tab
    },
    snsTextProcess() {
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
    async processInput(event) {
      const lineDiv = event.target;
      let line = lineDiv.innerText.trim() + '.sats';
      event.preventDefault();
      if (line.endsWith(".sats")) {
        const dict = {
          p: 'sns',
          op: 'reg',
          name: line
        };
        const rawData = Buffer.from(JSON.stringify(dict, null, 2));
        this.file_data['data'][line + '.txt'] = {
          contentType: 'text/plain;charset=utf-8',
          rawData: rawData,
        };

        // Create the new div and span elements
        const span = document.createElement("span");
        span.style.color = "gray";
        span.innerText = line;
        span.style.minWidth = "300px";
        span.style.whiteSpace = "nowrap";
        // span.classList.add("q-mt-sm");
        const removeButton = document.createElement("button");
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("material-icons");
        // closeIcon.classList.add("q-mt-sm");
        closeIcon.innerText = "close";
        removeButton.appendChild(closeIcon);

        const retryButton = document.createElement("button");
        // retryButton.innerText = "Retry";
        const refreshIcon = document.createElement("i");
        refreshIcon.classList.add("material-icons");
        // refreshIcon.classList.add("q-mt-sm");
        retryButton.classList.add("q-mr-sm");
        refreshIcon.innerText = "refresh";
        retryButton.appendChild(refreshIcon);
        const newDiv = document.createElement("div");
        newDiv.appendChild(span);
        newDiv.appendChild(retryButton);
        newDiv.appendChild(removeButton);
        newDiv.classList.add("input-line");
        lineDiv.insertAdjacentElement('afterend', newDiv);
        // Clear the current line
        lineDiv.innerText = "";

        try {
          const response = await fetch("https://api.sats.id/names/" + line);
          const statusCode = response.status;

          if (statusCode === 404) {
            span.style.color = "green";
          } else if (response.ok) {
            span.style.color = "red";
          } else {
            span.style.color = "yellow";
          }
        } catch (error) {
          span.style.color = "yellow";
        }

        // Add the remove button event listener
        removeButton.addEventListener("click", () => {
          newDiv.remove();
        });

        // Add the retry button event listener
        retryButton.addEventListener("click", async () => {
          try {
            const response = await fetch("https://api.sats.id/names/" + line);
            const statusCode = response.status;

            if (statusCode === 404) {
              span.style.color = "green";
            } else if (response.ok) {
              span.style.color = "red";
            } else {
              span.style.color = "yellow";
            }
          } catch (error) {
            span.style.color = "yellow";
          }
        });
      }

      this.text = event.currentTarget;
    },
    clearData() {
      this.fileList = [];
      // this.$q.localStorage.set("session_data", {});
      this.market_data = {
        advance: false,
        custom_fee: 10,
        padding: 546,
        receiving_address_multi: {},
        receiving_mode: 'Single Address',
        selected_fee: 'halfHourFee'
      }
      this.message = '';
      this.file_data['data'] = {}
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
        // const contentType = item.type + ';charset=' + decoder.encoding;
        const contentType = mime.contentType(file.type).replace(/\s/g, '') || 'application/octet-stream';
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
      return mime.contentType(item.type).replace(/\s/g, '') || 'application/octet-stream';
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
        const response = await this.$api.post('/initiate', this.file_data, {
          headers: {'Cache-Control': 'no-cache'},
          cache: 'no-cache'
        });
        const json = response.data;
        this.order_data = response.data;
        this.$q.localStorage.set("session_data", response.data.session)
        this.session_data = this.$q.localStorage.getItem("session_data")
        console.log(json);
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
          session: this.session_data,
          order_id: this.order_data.order_id,
          network: "btc-mainnet",
          order_vbytes_cost: parseFloat((this.market_data.selected_fee !== 'Custom' ? this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)),
          customer_addresses: addresses,
          order_dust_val: 546,
          //
          //   'bc1pmp6vczk548g4dzyldean0vklqexpgvg69s425pdrw7dr2f39j93secucmm',
          // ]
        }

        let referral = this.$q.localStorage.getItem('referral')
        if (referral) {
          data["referral"] = referral
        }

        console.log(data)
        this.$q.loading.show();
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
      try {
        // this.$q.loading.show();
        const response = this.$api.get(
          "orders/" + this.session_data + "/" + this.order_data.order_id
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
    },
  },
  computed: {
    getAmount() {
      let fee = (this.market_data.selected_fee !== 'Custom' ? this.gas_fee_data[this.market_data.selected_fee] : this.market_data.custom_fee)
      if (!fee) {
        return 0
      }
      // parseInt((this.session_data.order_vbytes_count * (this.market_data.selected_fee!='Custom'?gas_fee_data[this.market_data.selected_fee]:this.market_data.custom_fee)) * 1.25 + this.session_data.order_file_count * 25546
      return parseInt((this.order_data.order_vbytes_count * fee) * 1 + this.order_data.order_file_count * 546 + 2500);
    }
  }
})
</script>
