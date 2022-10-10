<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <BotaoTemporizador
      texto="play"
      icone="fas fa-play"
      :desabilitado="cronometroRodando"
      @clicado="iniciar"
    />
    <BotaoTemporizador
      texto="stop"
      icone="fas fa-stop"
      :desabilitado="!cronometroRodando"
      @clicado="finalizar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Cronometro from "./Cronometro.vue";
import BotaoTemporizador from "./BotaoTemporizador.vue";

export default defineComponent({
  name: "TemporizadorFormulario",
  emits: ["aoTemporizadorFinalizado"],
  data() {
    return {
      cronometro: 0,
      tempoEmSegundos: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
  components: {
    Cronometro,
    BotaoTemporizador,
  },
});
</script>

<style>
</style>