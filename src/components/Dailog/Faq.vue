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
            We charge 0.00020 BTC per file and 25% of the network fees selected.
          </div>
          <div class="text-subtitle1 q-mt-md">
            What is FILES?
          </div>
          <div class="text-caption text-secondary">
            It's the default mode to upload your files and inscribe them onto the blockchain in the next step.
          </div>
          <div class="text-subtitle1 q-mt-md">
            What is SNS?
          </div>
          <div class="text-caption text-secondary">
            SNS mode is the default domain name system on bitcoin. You are able to search for available domains and easily inscribe them in the next steps.
          </div>
          <div class="text-subtitle1 q-mt-md">
            What is BRC20?
          </div>
          <div class="text-caption text-secondary">
            BRC20 is an experiment to create a standard for bitcoin fungible tokens. We abstract the complexity for you to easily inscribe the chosen quantity in the next steps.
          </div>
          <div class="text-subtitle1 q-mt-md">
            What is "Chained" transaction type?
          </div>
          <div class="text-caption text-secondary">
            Chained transactions are broadcasted in steps of 20 (or less if selected) and are connected to each other. The gas fee is added on the last transaction of the last step. This is the recommended transaction mode.
            <div class="text-caption text-secondary">
            - Inscription IDs are usually consecutive
            </div>
            <div class="text-caption text-secondary">
              - Slightly cheaper than batched mode
            </div>
            <div class="text-caption text-secondary">
              - Faster processing time when under 40 transactions than batched mode
            </div>
            <div class="text-caption text-secondary">
              - Non-automatic refunds if wrong amount is sent
            </div>
          </div>
          <div class="text-subtitle1 q-mt-md">
            What is "Batched" transaction type?
          </div>
          <div class="text-caption text-secondary">
            Batched transactions are broadcasted in 2 steps. First step is the commit which splits the funds into multiple reveal addresses. Second step emmits the reveal tranasctions all at once.

          </div>
          <div class="text-caption text-secondary">
            - Inscription IDs are not consecutive
          </div>
          <div class="text-caption text-secondary">
            - Slightly more expensive than batched mode
          </div>
          <div class="text-caption text-secondary">
            - Faster processing time when over 40 transactions than chained mode
          </div>
          <div class="text-caption text-secondary">
            - Automatic refunds if wrong amount is sent under 10 000 satoshis
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
      const tweetMessage = `toki is redefining the bitcoin ordinals scene with their never-before seen inscription features. Check them out https://to.ki/inscribe/ref/${this.referral_address} #bitcoin #ordinals`;
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
