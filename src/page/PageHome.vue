<script setup>
import SectionHome from '@/components/section/SectionHome.vue'

const props = defineProps(['token'])
</script>

<template>
  <SectionHome :token="props.token" />
</template>

<style scoped></style>
