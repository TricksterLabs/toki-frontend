<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="" style="background: linear-gradient(to right, #202D2E, #303428)">
      <q-toolbar>
        <q-toolbar-title>
          ToKi
        </q-toolbar-title>

        <div>
          <q-btn label="Inscribe" :to="'/'" flat no-caps></q-btn>
          <q-btn label="Market" :to="'/market'" class="q-ml-sm" flat no-caps></q-btn>
          <q-btn label="Faq" @click="faq=true" class="q-ml-sm" flat no-caps></q-btn>
        </div>
      </q-toolbar>
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
        <q-card-section class="text-center q-pa-sm">
          ToKi &copy; All Credits Reserved
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>

  <q-dialog
    v-model="faq"
  >
    <q-card dark class="no-shadow dialog_card_style"
            style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
      <q-card-section>
        <div class="text-h6">FAQ</div>
      </q-card-section>
      <q-separator color="secondary"></q-separator>
      <q-card-section class="">
        <div class="text-subtitle1">
          How do I check the status of my order?
        </div>
        <div class="text-caption text-secondary">
          On the main page of the app, there is a form where you can input your order number to check the status of your
          order and set receive address if you haven't already.
        </div>
        <div class="text-subtitle1 q-mt-md">
          What if I lost my order number?
        </div>
        <div class="text-caption text-secondary"> If you lose your order number and need it to check your order, you
          will need to
          contact us on Discord.

        </div>
        <div class="text-subtitle1 q-mt-md">
          Can I pay with another coins?
        </div>
        <div class="text-caption text-secondary">
          We are Bitcoin-only but you are welcome to use (at your own risk) swap services that immediately exchange
          other
          coins to Lightning like boltz.exchange or fixedfloat.com
        </div>

      </q-card-section>

      <q-card-section class="col-12 text-teal">
        <q-btn label="OK" class="float-right q-mb-md" outline v-close-popup/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import {setCssVar} from 'quasar'

setCssVar('accent', '#34d399')

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {

    const year = (new Date()).getFullYear()
    const leftDrawerOpen = ref(false)

    return {
      year,
      leftDrawerOpen,
      faq: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
.dialog_card_style {
  border-radius: 18px !important;
}
</style>
