<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="" style="background: linear-gradient(to right, #202D2E, #303428)">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <img src="~assets/toki_02.png" height="30" class="float-left">

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
        </q-toolbar-title>

        <div>
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
        <q-card-section class="text-center q-pa-none">
          <a style="text-decoration: none" class="cursor-pointer text-weight-medium">Terms & Conditions</a>
          <a style="text-decoration: none" class="q-ml-sm cursor-pointer text-weight-medium">Privacy Policy</a>
          <a style="text-decoration: none" @click="faq=true" class="q-ml-sm cursor-pointer text-weight-medium">Faq</a>
          <a style="text-decoration: none" @click="getOrderData" class="q-ml-sm cursor-pointer text-weight-medium">Orders</a>
        </q-card-section>
        <q-card-section class="text-center q-pa-sm text-weight-bolder">
          ToKi @ All Credits Reserved
        </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>

  <q-dialog no-backdrop-dismiss
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

  <q-dialog no-backdrop-dismiss
    v-model="orders"
  >
    <q-card dark class="no-shadow dialog_card_style"
            style="width: 700px; max-width: 80vw;background: linear-gradient(to right, #202D2E, #303428)">
      <q-card-section>
        <div class="text-h6">Orders</div>
      </q-card-section>
      <q-separator color="secondary"></q-separator>
      <q-card-section class="">
        <q-scroll-area
          style="height: 20rem;"
        >
          <q-list class="scroll">
            <template v-for="order in orders_data">
              <q-expansion-item
                class="shadow-1 overflow-hidden q-my-sm bg-transparent"
                style="border-radius: 30px"
                :icon="order.order_status=='pending'?'pending_actions':'verified'"
                :label="'Order Id - '+order.order_id"
                header-class="text-white"
                expand-icon-class="text-white" group="order"
              >
                <q-card class="bg-transparent">
                  <q-card-section class="row q-col-gutter-sm">
                    <div class="col-6">
                      <q-input outlined v-model="order.order_status" dense readonly dark color="grey-5"
                               class="full-width-right" padding="sm md" label="Order Status"
                      />
                    </div>
                    <div class="col-6">
                      <q-input outlined v-model="order.order_file_count" dense readonly dark color="grey-5"
                               class="full-width q-mr-sm" padding="sm md" label="Order File Count"
                      />
                    </div>
                    <div class="col-6">
                      <q-input outlined v-model="order.order_file_size" dense readonly dark color="grey-5"
                               class="full-width q-mr-sm" padding="sm md" label="Order File Size"
                      />
                    </div>
                    <div class="col-6">
                      <q-input outlined v-model="order.order_service_cost" dense readonly dark color="grey-5"
                               class="full-width q-mr-sm" padding="sm md" label="Order Service Cost"
                      />
                    </div>
                    <div class="col-6">
                      <q-input outlined v-model="order.order_service_address" dense readonly dark color="grey-5"
                               class="full-width q-mr-sm" padding="sm md" label="Order Service Address"
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
      faq: ref(false),
      orders: ref(false),
      orders_data:ref([]),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      $q
    }
  },
  mounted() {
    this.session_data = this.$q.localStorage.getItem("session_data");
  },
  methods:{
    getOrderData() {
      try {
          this.$q.loading.show({
          message: 'Fetching Orders data. Hang on...'
        })

        const response = axios.get('https://api.inscribe.to.ki/orders/'+this.session_data.session).then(function (response) {
          this.orders_data = response.data;
          this.orders_data.sort((a, b) => b.order_id - a.order_id);
          this.orders = true
          this.$q.loading.hide();
        }.bind(this));
      } catch (error) {
        console.error(error);
          this.$q.loading.hide();
      }
    },
  }
})
</script>

<style>
.dialog_card_style {
  border-radius: 18px !important;
}
</style>
