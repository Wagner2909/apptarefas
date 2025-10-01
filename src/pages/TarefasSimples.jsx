import { useState, useEffect } from "react"
export default function TarefasSimples() {
    const [listaDeTarefas, setListaDeTarefas] = useState ([])
    const [novaTarefa, setNovaTarefa] = useState ("")

    // Leitura das tarefas no localstorage
    useEffect(() => {
        const tarefasSalvas = localStorage.getItem("tarefasSimples")
        if (tarefasSalvas){
            setListaDeTarefas(JSON.parse(tarefasSalvas))
        }
    }, [])
    // O segundo parametro [] indica que este codigo será executado somente uma vez
    // Quando a página for carregada
    
    // Persistir os dados localmente
    // Executar sempre que listaDeTarefas for alterado
    useEffect(() => {
         if (listaDeTarefas.length > 0) {
             // Como listaDeTarefas é um array em JS, o JSON.stringify
             // É usado para converter em formato texto (json)
             localStorage.setItem("tarefasSimples", JSON.stringify(listaDeTarefas))
         }
     }, [listaDeTarefas])


    function adicionarTarefa(){
        if (novaTarefa.trim() == ""){          // Caso não for digitado nada
            return
        }
        // Se foi digitado texto valido
        // Cria um novo array com as tarefas antigas mais a nova tarefa
            setListaDeTarefas([...listaDeTarefas, novaTarefa])
            setNovaTarefa("")                  // Limpar o campo de digitação     
    }

    function removerTarefa(index){
        // Cria uma nova lista sem a tarefa que esta no indice recebido
        const listaAtualizada = listaDeTarefas.filter((tarefa, i) =>{
            // Mantém todas as tarefas cujo indice é diferente do index
            return i !=index
        })

        // Atualiza o estado com a nova lista
        setListaDeTarefas(listaAtualizada)
    }

    function ordenarTarefas(){
        const listaOrdenada = [...listaDeTarefas].sort((a,b)=> a.localeCompare(b))
        setListaDeTarefas(listaOrdenada)
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h1 className="text-center mb-4">Tarefas Simples</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Digite a nova tarefa"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                />
                <button className="btn btn-primary" onClick={adicionarTarefa}>
                    Adicionar    
                </button>

                <button className="btn btn-warning btn-sm" onClick={ordenarTarefas}>
                    Ordenar tarefas    
                </button>
            </div>

            <ul className="list-group">
                {listaDeTarefas.length == 0 && (
                    <li className="list-group-item text-center text-muted">
                        Nenhuma Tarefa Adicionada
                    </li>
                )}
                {listaDeTarefas.map((tarefa, posicaoNoIndex) => (
                    <li
                        key={posicaoNoIndex}
                        className="list-group-item d-flex justify-content-between"
                    >
                        {tarefa}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removerTarefa(posicaoNoIndex)}
                        >Remover</button>

                    </li>
                ))}
            
              
            </ul>
        </div>
    )

}
