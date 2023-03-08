<template>
  <q-dialog
    :model-value="faq" @hide="clearData"
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
        <q-btn label="OK" class="float-right q-mb-md" @click="clearData" outline v-close-popup/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref, defineComponent} from "vue";

export default defineComponent({
  name: "Faq",
  setup(){
    return {
      referral: ref(false),
      referral_address: ref(""),
    }
  },
  props:['faq'],
  emits:['update_faq'],
  methods:{
    tweet() {
      const tweetMessage = `To.Ki is a new inscription service. https://to.ki/inscribe/ref/${this.referral_address}`;
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetMessage
      )}`;
      window.open(tweetUrl);
    },
    clearData(){
      this.referral=false;
      this.referral_address='';
      this.$emit('update_faq',false)
    }
  }
})
</script>

<style scoped>

</style>
