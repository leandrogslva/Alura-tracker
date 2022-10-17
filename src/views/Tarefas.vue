<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
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
import { computed, defineComponent, ref, watchEffect } from "vue";
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
  name: "TarefasView",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    const tarefaSelecionada = ref(null as ITarefa | null);
    const filtro = ref("");

    const salvarTarefa = (tarefa: ITarefa): void => {
      store.dispatch(CADASTRAR_TAREFA, tarefa);
    };
    const selecionarTarefa = (tarefa: ITarefa): void => {
      tarefaSelecionada.value = Object.assign({}, tarefa);
    };
    const fecharModal = (): void => {
      tarefaSelecionada.value = null;
    };
    const alterarTarefa = (): void => {
      store
        .dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
        .then(() => fecharModal());
    };

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    })

    return {
      store,
      fecharModal,
      salvarTarefa,
      selecionarTarefa,
      alterarTarefa,
      tarefaSelecionada,
      tarefas: computed(() => store.state.tarefa.tarefas),
      listaEstaVazia: computed(() => store.state.tarefa.tarefas.length === 0),
      filtro,
    };
  },
});
</script>

<style>
</style>