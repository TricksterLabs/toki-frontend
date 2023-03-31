<template>
  <q-dialog
    :model-value="orders" @hide="clearData"
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
                    {{ 'Order Id - ' + order.order_id }}
                  </q-item-section>

                  <q-item-section side class="text-uppercase text-white">
                    {{ order.order_status }}
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
                      <q-input outlined :model-value="order.order_file_count+'/'+order.order_file_size" dense readonly
                               dark color="secondary"
                               class="full-width q-mr-sm" padding="sm md" label="Order File Count / File Size"
                      />
                    </div>
                    <div class="col-6">
                      <q-input outlined v-model="order.order_transaction_mode" dense readonly dark color="secondary"
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
        <q-btn label="OK" class="float-right q-mb-md" @click="clearData" outline v-close-popup/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "orders",
  props: ['orders', "orders_data"],
  methods:{
    clearData(){
      this.referral=false;
      this.$emit('update_orders',false)
    }
  }
})
</script>

<style scoped>

</style>
