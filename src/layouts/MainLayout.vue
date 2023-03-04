<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-center" style="background: linear-gradient(to right, #202D2E, #303428)">
      <div class="flex full-height flex-center">
        <q-toolbar class="toolbar_style">
          <q-toolbar-title class="">
            <img src="~assets/toki_02.png" height="30" class="float-left">
          </q-toolbar-title>
          <q-space></q-space>
          <div>
            <q-btn label="Inscribe" :to="'/'" flat no-caps></q-btn>
            <q-btn label="Market" :to="'/market'" class="q-ml-sm" disable flat no-caps>
              <q-tooltip>
                Coming Soon
              </q-tooltip>
            </q-btn>
            <q-btn label="Wallet" :to="'/market'" class="q-ml-sm" flat disable no-caps>
              <q-tooltip>
                Coming Soon
              </q-tooltip>
            </q-btn>

            <q-btn type="a" rounded dense href="" target="__blank" size="md"
                   icon="fab fa-discord" class="q-mr-md q-ml-lg" flat color="secondary"></q-btn>
            <q-btn type="a" rounded dense href="" target="__blank"
                   icon="fab fa-twitter" class="q-mr-sm"
                   flat color="secondary"></q-btn>
          </div>
        </q-toolbar>
      </div>
    </q-header>

    <!--    <q-drawer-->
    <!--      v-model="leftDrawerOpen"-->
    <!--      show-if-above-->
    <!--      bordered-->
    <!--    >-->
    <!--      <q-list>-->
    <!--        <q-item-label-->
    <!--          header-->
    <!--        >-->
    <!--          Essential Links-->
    <!--        </q-item-label>-->

    <!--        <EssentialLink-->
    <!--          v-for="link in essentialLinks"-->
    <!--          :key="link.title"-->
    <!--          v-bind="link"-->
    <!--        />-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer style="background: linear-gradient(to right, #202D2E, #303428)">
      <q-card class="no-shadow bg-transparent no-border">
        <q-card-section class="text-center q-pa-none">
          <a style="text-decoration: none" class="cursor-pointer text-weight-medium" @click="terms_condition=true">Terms
            & Conditions</a>
          <a style="text-decoration: none" class="q-ml-md cursor-pointer text-weight-medium"
             @click="privacy_policy=true">Privacy Policy</a>
        </q-card-section>
        <q-card-section class="text-center q-pa-none text-weight-bolder">
          ToKi @ All Credits Reserved
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>


  <q-dialog
            v-model="terms_condition"
  >
    <q-card dark class="no-shadow dialog_card_style"
            style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
      <q-card-section>
        <div class="text-h6">Terms & Conditions</div>
      </q-card-section>
      <q-separator color="secondary"></q-separator>
      <q-card-section class="">
        <q-scroll-area
          style="height: 30rem;"
        >
        <!-- <div class="text-subtitle1">
          Terms and Conditions
        </div> -->
        <div class="text-caption text-secondary">
          Welcome to toki, a company specializing in Bitcoin and NFT solutions. These terms and conditions ("Agreement")
          are a legal agreement between you ("User") and toki, a company registered under the laws of the applicable
          jurisdiction. By accessing and using our services, you agree to the following terms and conditions:
        </div>
        <div class="text-subtitle1 q-mt-md">
          Our Services
        </div>
        <div class="text-caption text-secondary">
          Our services include NFT minting, marketplace, and wallets. User acknowledges and agrees that toki is not
          responsible for any losses or damages incurred due to uncontrollable effects from the network or mismanagement
          of User.
        </div>
        <div class="text-caption text-secondary">
          User acknowledges and agrees that toki is a Bitcoin-only platform. Any use of swap services that immediately
          exchange other coins to Lightning like boltz.exchange or fixedfloat.com shall be done at User's own risk. toki
          shall not be responsible for any losses or damages incurred during such swap.
        </div>
        <div class="text-caption text-secondary">
          User acknowledges and agrees that any NFTs minted on toki's platform are User's responsibility. toki does not
          hold any responsibility for the content or legality of the NFTs.
        </div>
        <div class="text-caption text-secondary">
          toki's marketplace is a platform for buying and selling NFTs. User acknowledges and agrees that toki does not
          own any NFTs listed on the marketplace and is not responsible for any transaction disputes that may arise.
        </div>
        <div class="text-caption text-secondary">
          User acknowledges and agrees that any use of toki's services must be in compliance with all applicable laws
          and regulations. toki reserves the right to suspend or terminate any user account that violates this
          Agreement.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Changes to this Agreement
        </div>
        <div class="text-caption text-secondary">
          toki reserves the right to modify this Agreement at any time without prior notice. By continuing to use toki's
          services, User agrees to any changes made to this Agreement.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Dispute Resolution
        </div>
        <div class="text-caption text-secondary">
          User acknowledges and agrees that any disputes arising out of or in connection with this Agreement, including
          any questions regarding its existence, validity, or termination, shall be resolved by binding arbitration in
          accordance with the applicable arbitration rules.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Contact Us
        </div>
        <div class="text-caption text-secondary">
          If User has any questions or concerns regarding this Agreement, please contact us on Twitter.
        </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="col-12 text-teal">
        <q-btn label="OK" class="float-right q-mb-md" outline v-close-popup/>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
            v-model="privacy_policy"
  >
    <q-card dark class="no-shadow dialog_card_style"
            style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
      <q-card-section>
        <div class="text-h6">Privacy Policy</div>
      </q-card-section>
      <q-separator color="secondary"></q-separator>
      <q-card-section class="">
        <q-scroll-area
          style="height: 30rem;"
        >
        <div class="text-caption text-secondary">
          At toki, we take your privacy very seriously. This Privacy Policy outlines how we collect, use, and protect
          your personal information when you use our services. By using toki's services, you consent to our collection
          and use of your personal information in accordance with this policy.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Information We Collect
        </div>
        <div class="text-caption text-secondary">
          When you use toki's services, we may collect transaction data and store session data if the user agrees. We do
          not collect or store any other personal information.
        </div>
        <div class="text-subtitle1 q-mt-md">
          How We Use Your Information
        </div>
        <div class="text-caption text-secondary">
          We use your transaction data and session data (if agreed) to provide and improve our services, and respond to
          your inquiries.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Sharing Your Information
        </div>
        <div class="text-caption text-secondary">
          We do not share your personal information with third parties except as necessary to provide our services,
          comply with legal obligations, or protect our rights and property.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Security
        </div>
        <div class="text-caption text-secondary">
          We take appropriate measures to protect your personal information from unauthorized access, disclosure, or
          misuse. However, no data transmission over the Internet or any wireless network can be guaranteed to be 100%
          secure. Therefore, we cannot guarantee the security of your information transmitted to or from toki's
          services, and you do so at your own risk.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Changes to this Policy
        </div>
        <div class="text-caption text-secondary">
          toki reserves the right to modify this Privacy Policy at any time without prior notice. By continuing to use
          toki's services, you agree to any changes made to this Policy.
        </div>
        <div class="text-subtitle1 q-mt-md">
          Contact Us
        </div>
        <div class="text-caption text-secondary">
          If you have any questions or concerns regarding this Privacy Policy, please contact us on Twitter.
        </div>
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="col-12 q-mb-md text-teal">
        <q-btn label="OK" class="float-right q-mb-md" outline v-close-popup/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import {setCssVar, useQuasar} from 'quasar'
import axios from "axios";

setCssVar('accent', '#34d399')

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {

    const $q = useQuasar();
    const year = (new Date()).getFullYear()
    const leftDrawerOpen = ref(false)

    return {
      year,
      leftDrawerOpen,
      terms_condition: ref(false),
      privacy_policy: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      $q
    }
  }
})
</script>

<style>
.dialog_card_style {
  border-radius: 18px !important;
}
</style>
