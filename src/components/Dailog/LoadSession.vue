<template>

  <q-dialog
    :model-value="load_session"
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
</template>

<script>
import {ref, defineComponent} from "vue";
import {useQuasar} from "quasar";

export default defineComponent({
  name: "LoadSession",
  setup() {
    const $q = useQuasar();
    return {
      session: ref(""),
      $q
    }
  },
  props: ["load_session"],
  methods: {
    clearData() {
      this.session = "";
      this.$emit('update_session', false)
    },
    loadSession() {
      this.$q.localStorage.set("session_data", this.session);
      this.session_data = this.session;
      this.session = '';

      this.$q.notify({
        type: 'positive',
        message: 'Session Loaded Successfully'
      });
      this.clearData()
    },
  }
})
</script>

<style scoped>

</style>
