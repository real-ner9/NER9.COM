<script setup lang="ts">
import ReactComponentWrapper from '@/components/ReactComponentWrapper.vue'
import { DikCounter } from 'dikApp/DikCounter'
</script>

<template>
  <ReactComponentWrapper :component="DikCounter" :component-props="{initialValue: 1, isBig: true}" />
</template>
