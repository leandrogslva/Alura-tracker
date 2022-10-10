<template>
  <div class="box has-text-weight-bold" :style="estilos">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BoxLista",
  data() {
    return {
      estilos: {
        background: "#faf0ca",
      },
    };
  },
});
</script>

