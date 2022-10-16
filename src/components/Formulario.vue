<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        area-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "FormulárioApp",
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  components: {
    Temporizador,
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find((projeto) => projeto.id == this.idProjeto),
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projeto.projetos),
    };
  },
  emits: ["aoSalvarTarefa"],
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background: var(--bg-primario);
}
</style>

