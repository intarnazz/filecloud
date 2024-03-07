<script setup>
import {} from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { FileChange, FileDelete, FileDownLoad, FileShared } from '@/api/api.js'

const props = defineProps(['token'])
const files = ref([])
const fileChangeKey = ref(null)
const fileNewName = ref('')

async function init() {
  files.value = await FileShared(props.token)
}

onMounted(async () => {
  await init()
})

function fileChangeEvent(key, name) {
  if (fileChangeKey.value === null || fileChangeKey.value !== key) {
    fileChangeKey.value = key
    fileNewName.value = name
  } else {
    fileChangeKey.value = null
  }
}

async function fileNameChangeEvent(key) {
  let name = fileNewName.value
  const nameArr = name.split('.')
  if (nameArr.length > 1) {
    name = ''
    for (let i = 0; i < nameArr.length - 1; i++) {
      name += nameArr[i]
    }
  }
  await FileChange(props.token, key, name)
  fileChangeKey.value = null
  init()
}

async function deleteFileEvent(key) {
  await FileDelete(props.token, key)
  init()
}

async function downLoadEvent(key, name) {
  const url = await FileDownLoad(props.token, key)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}

watch(() => props.token, init)
</script>

<template>
  <section class="shared boxY flex1">
    <div class="wrapper flex1 boxY">
      <div class="">
        <div class="boxY">
          <ul v-if="files.message !== 'Login failed'" class="boxY">
            <li class="boxY shared__item" v-for="(value, key) in files" :key="key">
              <div class="boxX">
                <div v-if="fileChangeKey !== value.file_id" class="boxX">
                  {{ value.name }}
                </div>
                <div v-else class="boxX flex1">
                  <form class="flex1 boxX" @submit.prevent="fileNameChangeEvent(value.file_id)">
                    <input style="margin: -1px" class="flex1" v-model="fileNewName" type="text" />
                  </form>
                </div>
                <div class="boxX">
                  <button class="cursor" @click="downLoadEvent(value.file_id, value.name)">
                    <span style="color: hsla(160, 100%, 37%, 1)" class="material-symbols-outlined">
                      download
                    </span>
                  </button>
                  <button class="cursor" @click="fileChangeEvent(value.file_id, value.name)">
                    <span style="color: hsla(184, 60%, 45%, 1)" class="material-symbols-outlined">
                      edit_document
                    </span>
                  </button>
                  <button class="cursor" @click="deleteFileEvent(value.file_id)">
                    <span style="color: hsla(0, 60%, 55%, 0.8)" class="material-symbols-outlined">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.shared
  &__item
    height: 45px
  &__button
    border-radius: 30px
  &__cloud
    background-color: hsla(184, 100%, 35%, 1)
    border: 1px solid hsla(184, 100%, 17%, 1)

.material-symbols-outlined
  color: hsla(0, 0%, 100%, .8)
  transition: .2s
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24

.material-symbols-outlined:active
  transform: scale(1.3)

li
  background-color: rgba(255,255 ,255 ,.1)
  padding: .5em 1em
  border-radius: 10px
  transition: .8s
  overflow: hidden

.displayNone
  height: auto
</style>
