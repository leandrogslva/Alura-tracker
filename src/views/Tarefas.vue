<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Box v-if="listaEstaVazia"> Você não está muito produtivo hoje </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head" style="height: 5rem">
          <p class="modal-card-title">Modal title</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa">
            Salvar alterações
          </button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "TarefasViw",
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = Object.assign({}, tarefa);
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
});
</script>

<style>
</style>