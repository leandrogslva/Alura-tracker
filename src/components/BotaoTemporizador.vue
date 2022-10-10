<template>
  <button class="button" :disabled="desabilitado" @click="$emit('clicado')">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BotaoTemporizador",
  emits: ["clicado"],
  props: {
    desabilitado: {
      type: Boolean,
      default: false,
    },
    icone: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
</style>