import IProjeto from "@/interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO } from "./tipo-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [
            {
                id: 1,
                titulo: "sucesso",
                texto: "Uma notificação de sucesso",
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                titulo: "atenção",
                texto: "Uma notificação de atenção",
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                titulo: "falha",
                texto: "Uma notificação de falha",
                tipo: TipoNotificacao.FALHA
            }
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(projetos => projetos.id != id)
        }
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}