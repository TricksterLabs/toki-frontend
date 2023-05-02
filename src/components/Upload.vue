<template>
  <q-card class="bg-transparent no-shadow" style="height: 408px;max-height: 408px"
    :style="$q.screen.lt.sm?{'max-width': '20rem','min-width': '20rem'}:{'max-width': '35rem','min-width': '35rem'}">
    <q-card-section class="q-pa-none text-center" :class="$q.screen.lt.sm?'q-px-none':''">
      <q-btn @click="selectTab('Files')"
        :class="(selected_tab==='Files'?'active_item':'button_width')+($q.screen.lt.sm?' button_width_mobile':' button_width')"
        color="secondary" no-caps outline :size="$q.screen.lt.sm?'md':'lg'" :label="'FILES'" />
      <q-btn @click="selectTab('Sns')"
        :class="(selected_tab==='Sns'?'active_item':'')+($q.screen.lt.sm?' button_width_mobile':' button_width')"
        class="q-ml-md " color="secondary" no-caps outline :size="$q.screen.lt.sm?'md':'lg'" :label="'SNS'" />

      <q-btn @click="selectTab('BRC20')"
        :class="(selected_tab==='BRC20'?'active_item':'')+($q.screen.lt.sm?' button_width_mobile':' button_width')"
        class="q-ml-md " color="secondary" no-caps outline :size="$q.screen.lt.sm?'md':'lg'" :label="'BRC20'" />

      <q-btn @click="selectTab('Text')"
        :class="(selected_tab==='Text'?'active_item':'')+($q.screen.lt.sm?' button_width_mobile':' button_width')"
        class="q-ml-md " color="secondary" no-caps outline :size="$q.screen.lt.sm?'md':'lg'" :label="'Text'" />
      <!--      <q-btn class="q-ml-md " disable-->
      <!--             :class="($q.screen.lt.sm?'button_width_mobile':' button_width')"-->
      <!--             color="secondary" no-caps outline size="lg" :label="'Collection'">-->
      <!--        <q-tooltip>-->
      <!--          Coming Soon-->
      <!--        </q-tooltip>-->
      <!--      </q-btn>-->
    </q-card-section>

    <div v-if="selected_tab==='Files'">
      <q-card-section class="q-pb-none text-center" :class="$q.screen.lt.sm?'q-px-none':''">
        <div class="text-subtitle1 ">Upload any file type up to 400KB and total file size of up to 100MB.
        </div>
      </q-card-section>
      <q-card-section class="text-center items-center justify-center q-pb-sm" :class="$q.screen.lt.sm?'q-px-none':''">
        <q-uploader class="no-shadow remove_padding" ref="file" :class="$q.screen.lt.sm?'dropzone_mobile':'dropzone'"
          url="http://localhost:4444/upload" @added="handleAdded" multiple>
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
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <q-item-section class="drag-drop" v-if="scope.files.length===0"
              :style="$q.screen.lt.sm?{'margin-top':'2rem !important'}:{}">
              <q-item-label>
                <q-icon name="cloud_upload" class="cursor-pointer" size="100px" @click="$refs.file.pickFiles()"
                  color="white" />
                <div>{{ dropzoneText }}</div>
              </q-item-label>
            </q-item-section>

          </template>
        </q-uploader>
      </q-card-section>

      <div class="text-caption text-italic text-center">
        By interacting with our tools you agree to our terms of service.
      </div>
    </div>
    <div v-if="selected_tab==='Sns'">
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center">
        <div class="text-subtitle1 ">Add your .sats names below, each one on a new line.</div>
      </q-card-section>
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center items-center q-pt-none justify-center">
        <div :class="$q.screen.lt.sm?'textarea_mobile':'textarea'">
          <div contenteditable="true" ref="editor" spellcheck="false" @keydown.enter="processInput"
            style="white-space: pre-wrap;padding: 10px;margin-left: -10px;margin-right: -10px" class="editor">
          </div>
        </div>

        <div class="q-mb-md">
          <q-badge color="" style="background-color: #00e676" rounded class="q-mr-sm" />
          Domain is Free
          <q-badge color="red" rounded class="q-ml-md" />
          <span class="q-ml-sm">Domain is Taken</span>
          <q-badge color="yellow" rounded class="q-ml-md" />
          <span class="q-ml-sm">API error</span>
        </div>
        <div class="text-caption text-italic">
          Data is provided by a third party, accuracy is not guaranteed.
        </div>
      </q-card-section>
    </div>
    <div v-if="selected_tab==='BRC20'">
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center">
        <div class="text-subtitle1 ">Choose the token file quantity to inscribe.</div>
      </q-card-section>
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center q-pa-none q-pb-xs">
        <q-radio v-model="mint_type" checked-icon="task_alt" dark unchecked-icon="panorama_fish_eye" val="mint"
          color="info" @update:model-value="removeDeployData" size="50px" label="Mint" />
        <q-radio v-model="mint_type" checked-icon="task_alt" dark unchecked-icon="panorama_fish_eye" val="deploy"
          color="info" size="50px" label="Deploy" />

      </q-card-section>
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center items-center q-pt-none justify-center">
        <div v-if="mint_type==='mint'">
          <q-input outlined v-model="tick" dense dark color="secondary" class="full-width q-mr-sm" padding="sm md"
            label="Tick" hide-bottom-space @update:model-value="removeFileData" :rules="[
                                  val => val.length >= 1 || 'Tick should be greater than 1 character',
                                  val => val.length < 64 || 'Tick should be less than 64 characters'
                                ]" />

          <q-input outlined v-model.number="tick_amount" dense dark color="secondary" class="full-width q-mr-sm q-mt-sm"
            padding="sm md" label="Amount" hide-bottom-space type="number" id="myNumberInput" :rules="[
                                      val => Number.isInteger(val) || 'Amount must be an integer',
                                      val => val >= 1 || 'Amount must be greater than 1'
                                    ]" />

          <div class="q-mt-sm">
            <q-badge color="secondary" class="">
              Repeat Mint
            </q-badge>

            <q-slider v-model="tick_repeat" :min="0"
              color="secondary" @update:model-value="genericBRCInput" label-always switch-label-side />
          </div>
        </div>

        <div v-if="mint_type==='transfer'">
          <q-input outlined v-model="tick" dense dark color="secondary" class="full-width q-mr-sm" padding="sm md"
            label="Tick" hide-bottom-space @update:model-value="removeFileData" :rules="[
                                  val => val.length >= 1 || 'Tick should be greater than 1 character',
                                  val => val.length < 64 || 'Tick should be less than 64 characters'
                                ]" />

            <q-slider v-model="tick_repeat" :min="0"
              color="secondary" @update:model-value="genericBRCInput" label-always switch-label-side />
          </div>
        </div>

        <div v-if="mint_type==='deploy'">
          <q-input outlined v-model="deploy_tick" dense dark color="secondary" class="full-width q-mr-sm" padding="sm md"
            label="Tick" hide-bottom-space @update:model-value="genericDeployInput" :rules="[
                                  val => val.length >= 1 || 'Tick should be greater than 1 character',
                                  val => val.length < 64 || 'Tick should be less than 64 characters'
                                ]" />

          <q-input outlined @update:model-value="genericDeployInput" v-model.number="deploy_amount" dense dark
            color="secondary" class="full-width q-mr-sm q-mt-sm" padding="sm md" label="Total Supply" hide-bottom-space
            type="number" :rules="[
                                      val => Number.isInteger(val) || 'Amount must be an integer',
                                      val => val >= 1 || 'Amount must be greater than 1'
                                    ]" />

          <q-input outlined @update:model-value="genericDeployInput" v-model.number="deploy_limit" dense dark
            color="secondary" class="full-width q-mr-sm q-mt-sm" padding="sm md" label="Limit Per Mint" hide-bottom-space
            type="number" :rules="[
                                      val => Number.isInteger(val) || 'Amount must be an integer',
                                      val => val >= 1 || 'Amount must be greater than 1',
                                      val => val <= deploy_amount || 'Limit per mint must be lower than deploy amount'
                                    ]" />
        </div>
        <div class="text-caption text-italic q-mt-xl">
          BRC20 tokens are experimental. Please use at your own risk.
        </div>
      </q-card-section>
    </div>
    <div v-if="selected_tab==='Text'">
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center">
        <div class="text-subtitle1 ">Input text in the format of choice.</div>
      </q-card-section>
      <q-card-section :class="$q.screen.lt.sm?'q-px-none':''" class="text-center q-pa-none q-pb-xs">
        <q-input v-model="text_data" spellcheck="false" type="textarea" @update:model-value="normalTextInput" dark outlined rows="13" color="secondary"/>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue'
import mime from 'mime-types';
import naturalCompare from "natural-compare";

export default defineComponent({
  name: "Upload",
  setup() {
    return {
      selected_tab: ref('Files'),
      tick: ref(''),
      deploy_tick: ref(''),
      mint_type: ref('mint'),
      text_data: ref(''),
      tick_amount: ref(),
      deploy_amount: ref(),
      tick_repeat: ref(0),
      deploy_limit: ref(),
      file_data: ref({ data: {} }),
      fileList: ref([]),
      text: ref(""),
      // ordi: ref(0),
      pepeMoji: ref(0),
      depp: ref(0),
      meme: ref(0),
      punk: ref(0),
      rock: ref(0),
      pepe: ref(0),
      kek: ref(0),
      file_data_display: ref({}),
      dropzoneText: 'Drag and drop files here or click to select files',
    }
  },
  props: ['clear_inner_child_data'],
  methods: {
    validateTickAmount(value) {
      if (!Number.isInteger(value) || value <= 1) {
        return 'Amount must be an integer above 1'
      }
      return true
    },
    selectTab(tab) {
      this.fileList = [];
      this.file_data['data'] = {};
      this.selected_tab = tab
      this.deploy_tick = '';
      this.deploy_limit = null;
      this.deploy_amount = null;
      this.file_data['data'] = {};
      this.tick_repeat = 0;
      this.tick = '';
      this.text_data = '';
      this.tick_amount = null;
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
        const removeButton = document.createElement("button");
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("material-icons");
        closeIcon.innerText = "close";
        removeButton.appendChild(closeIcon);

        const retryButton = document.createElement("button");
        const refreshIcon = document.createElement("i");
        refreshIcon.classList.add("material-icons");
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
            span.style.color = "#00e676";
          } else if (response.ok) {
            span.style.color = "red";
          } else {
            span.style.color = "yellow";
          }
        } catch (error) {
          span.style.color = "yellow";
        }

        // Add the remove button event listener
        removeButton.addEventListener("click", (val) => {
          const firstSpan = newDiv.querySelector('span');
          const content = firstSpan.textContent;
          newDiv.remove();
          delete this.file_data['data'][content + '.txt'];
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
    // ordiInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("ordi"))
    //     .forEach(key => delete this.file_data['data'][key]);

    //   for (let i = 1; i <= this.ordi; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "ordi",
    //       "amt": "1000"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    removeFileData() {
      this.file_data['data'] = {}
      this.tick_repeat = 0
    },
    removeDeployData() {
      this.file_data['data'] = {}
      this.deploy_tick = '';
      this.deploy_limit = null;
      this.deploy_amount = null;
      this.file_data['data'] = {};
      this.tick_repeat = 0;
      this.tick = '';
      this.text_data = '';
      this.tick_amount = null;
    },
    genericBRCInput() {
      Object.keys(this.file_data['data'])
        .filter(key => key.includes(this.tick))
        .forEach(key => delete this.file_data['data'][key]);

      for (let i = 0; i < this.tick_repeat; i++) {
        const dict = {
          "p": "brc-20",
          "op": "mint",
          "tick": this.tick,
          "amt": this.tick_amount.toString()
        };
        const rawData = Buffer.from(JSON.stringify(dict, null, 2));
        this.file_data['data'][i + "_" + this.tick + '.txt'] = {
          contentType: 'text/plain;charset=utf-8',
          rawData: rawData,
        };
      }
    },
    normalTextInput() {
      this.file_data['data'] = {}
      this.file_data['data'][1 + "_text_data.txt"] = {
        contentType: 'text/plain;charset=utf-8',
        rawData: Buffer.from(this.text_data),
      };
    },
    genericDeployInput() {
      console.log(!this.deploy_limit || !this.deploy_limit || !this.deploy_tick)
      if (!this.deploy_limit || !this.deploy_limit || !this.deploy_tick) {
        return
      }

      Object.keys(this.file_data['data'])
        .filter(key => key.includes('deploy'))
        .forEach(key => delete this.file_data['data'][key]);

      const dict = {
        "p": "brc-20",
        "op": "deploy",
        "tick": this.deploy_tick,
        "amt": this.deploy_amount.toString(),
        "lim": this.deploy_limit.toString(),
      };
      const rawData = Buffer.from(JSON.stringify(dict, null, 2));
      this.file_data['data']["_deploy" + this.tick + '.txt'] = {
        contentType: 'text/plain;charset=utf-8',
        rawData: rawData,
      };

    },
    // pepeMojiInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("pepeMoji"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.pepeMoji; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "🐸🐸",
    //       "amt": "300"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // deppInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("depp"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.depp; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "depp",
    //       "amt": "1000"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // memeInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("meme"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.meme; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "meme",
    //       "amt": "1"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // punkInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("punk"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.punk; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "punk",
    //       "amt": "1"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // rockInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("rock"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.rock; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "rock",
    //       "amt": "1"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // pepeInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("pepe"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.pepe; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "pepe",
    //       "amt": "420"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
    // kekInput() {
    //   Object.keys(this.file_data['data'])
    //     .filter(key => key.includes("kek"))
    //     .forEach(key => delete this.file_data['data'][key]);
    //
    //   for (let i = 1; i <= this.kek; i++) {
    //     const dict = {
    //       "p": "brc-20",
    //       "op": "mint",
    //       "tick": "kek",
    //       "amt": "69"
    //     };
    //     const rawData = Buffer.from(JSON.stringify(dict, null, 2));
    //     this.file_data['data'][i + "_ord" + '.txt'] = {
    //       contentType: 'text/plain;charset=utf-8',
    //       rawData: rawData,
    //     };
    //   }
    // },
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
      this.fileList.sort(naturalCompare);

      let self = this;
      self.file_data['data'] = {}
      this.fileList.filter(async function (item) {
        const file = item;
        const fileData = await file.arrayBuffer();
        const rawData = Buffer.from(fileData);
        const contentType = mime.contentType(file.type).replace(/\s/g, '') || 'application/octet-stream';
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
  },
  watch: {
    'file_data': {
      handler: function (new_Val, old_value) {
        this.$emit('update_file_data', this.file_data)
      },
      deep: true
    },
    clear_inner_child_data: function () {
      if (this.clear_inner_child_data) {
        this.file_data = { data: {} };
        this.deploy_tick = '';
        this.deploy_limit = null;
        this.deploy_amount = null;
        this.tick_repeat = 0;
        this.tick = '';
        this.text_data = '';
        this.tick_amount = null;
        this.$emit('update_clear_inner_child_data', false)
      }
    }
  },
  emits: ['update_file_data', 'update_clear_inner_child_data']
})
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin-top: 0;
}
</style>
