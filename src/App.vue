<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { UserReg, UserLogin, UserLogout } from '@/api/api.js'

const regIsOpen = ref(false)
const loginIsOpen = ref(false)
const popupScale = ref(false)
const first_name = ref('')
const last_name = ref('')
const email = ref('')
const password = ref('')
const errorArr = ref([])
const token = ref(null)

onMounted(async () => {
  token.value = localStorage.getItem('token')
})

async function registration() {
  const res = await UserReg(first_name.value, last_name.value, email.value, password.value)
  if (res.success) {
    localStorage.setItem('token', res.token)
    regIsOpen.value = false
    popupScale.value = false
  } else {
    errorArr.value = res.message
  }
}

async function authorization() {
  const res = await UserLogin(email.value, password.value)
  if (res.success) {
    token.value = res.token
    localStorage.setItem('token', res.token)
    loginIsOpen.value = false
    popupScale.value = false
  } else {
    errorArr.value = res.message
  }
}

function regIs() {
  if (regIsOpen.value) {
    regIsOpen.value = false
    popupScale.value = false
  } else {
    regIsOpen.value = true
    setTimeout(() => {
      popupScale.value = true
    }, 1)
  }
}

function loginIs() {
  if (loginIsOpen.value) {
    loginIsOpen.value = false
    popupScale.value = false
  } else {
    loginIsOpen.value = true
    setTimeout(() => {
      popupScale.value = true
    }, 1)
  }
}

async function logout() {
  await UserLogout(token.value)
  localStorage.setItem('token', '')
  token.value = null
}

function clearErrorArr() {
  errorArr.value = []
}

watch(loginIsOpen.value, clearErrorArr)
watch(regIsOpen.value, clearErrorArr)
</script>

<template>
  <header class="header">
    <div class="wrapper boxX">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
      <div v-if="!token" class="boxX">
        <button @click="loginIs" class="button">Войти</button>
        <button @click="regIs" class="button">Регистрация</button>
      </div>
      <div v-else class="boxX">
        <button @click="logout" class="button">Выйти</button>
      </div>
    </div>
  </header>

  <div v-if="regIsOpen" class="popup">
    <form :class="{ scale: !popupScale }" @submit.prevent="registration" class="boxY">
      <div class="boxX">
        <label for="first_name">Имя: </label
        ><input v-model="first_name" id="first_name" name="first_name" type="text" />
      </div>
      <div class="boxX">
        <label for="last_name">Фамилия: </label
        ><input v-model="last_name" id="last_name" name="last_name" type="text" />
      </div>
      <div class="boxX">
        <label for="email">Email: </label
        ><input v-model="email" id="email" name="email" type="email" />
      </div>
      <div class="boxX">
        <label for="password">Пароль: </label
        ><input v-model="password" id="password" name="password" type="password" />
      </div>
      <div class="boxY">
        <ul>
          <li class="err" v-for="(value, key) in errorArr" :key="key">* {{ value }}</li>
        </ul>
      </div>
      <input class="button" value="Зарегистрироваться" type="submit" />
    </form>
    <div @click="regIs" class="exit">X</div>
  </div>

  <div v-if="loginIsOpen" class="popup">
    <form :class="{ scale: !popupScale }" @submit.prevent="authorization" class="boxY">
      <div class="boxX">
        <label for="log-email">Email: </label
        ><input v-model="email" id="log-email" name="email" type="email" />
      </div>
      <div class="boxX">
        <label for="log-password">Пароль: </label
        ><input v-model="password" id="log-password" name="password" type="password" />
      </div>
      <div class="boxY">
        <ul>
          <li class="err" v-for="(value, key) in errorArr" :key="key">* {{ value }}</li>
        </ul>
      </div>
      <input class="button" value="Войти" type="submit" />
    </form>
    <div @click="loginIs" class="exit">X</div>
  </div>

  <RouterView class="content" :token="token" />
  <footer class="footer"></footer>
</template>

<style scoped></style>
