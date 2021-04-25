'use strict';
/*let banco = [
  {'tarefa': 'estudar JS', 'status': ''},
  {'tarefa': 'netflix', 'status': 'checked'},
  {'tarefa': 'Ler livro', 'status': ''}
];*/

//Salvando os dados no localStorage:

//Ceiando uma função que basicamente pega do banco. Cujo banco está teoricamente no localStorage. Então passamos para o localStorage um parâmetro (o que ele irá pegar), que no caso será o 'todoList'. Depois disso, fazemos uma condicional com ele: se ele não tiver NADA, então retorna um array vazio. 
const getBanco = () => JSON.parse(localStorage.getItem('todoList'))?? [];

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

//NO LOCALSTORAGE: 
/*
  console: localStorage.setItem('todoList', JSON.stringify(banco));
  Para pegar em tipo array, deve-se passar para o mesmo:
  JSON.parse(localStorage.getItem('todoList'));
*/

//"Ensinando" o main a criar as tarefas
                        //passando um padrão para o  status, caso não seja marcado como checked
const criarItems = (tarefa, status, indice) =>{
  const item = document.createElement('label') 
    //Criando a label .todo_item, porém deve-se inserir dentro do DOM e também, principalmente, informar qual a classe desse label. 
    item.classList.add('todo__item')//Acabamos de informar a classe dessa tag
    //Desejamos também clocar mais elementos dentro dele:  
    item.innerHTML = 
    //Para dar um "íncide" nas tarefas, deve-se usar uma propriedade feita para o próprio JSON, um atributo que ele pode ter qualquer nome: DATA-
    `
      <input type="checkbox" ${status} data-indice=${indice}>
      <div>${tarefa}</div>
      <!--O mesmo deve ser feito para o botão (que também deve ter um índice) -->
      <input type="button" value="&#128465;" data-indice=${indice}>
    `
    //Agora vamos informamar onde determinado elemento deve ficar. - Que no caso é dentro da #todoList, seu elemento pai

    document.getElementById('todoList').appendChild(item);
} 

/*
<label class="todo__item">
  <input type="checkbox">
  <div>teste de item 1</div>
  <input type="button" value="X">               
</label>
*/ 
const limparTarefas = () => {
  //Precisamos pegar o elemento pai
   const todoList = document.getElementById('todoList');
   //depois disso passamos uma estrutura de repetição, que por sua vez, tem a seguinte analogia: "enquanto haver o primeiro Filho, remover o último filho da tabela de tarefas"
   while(todoList.firstChild){
     todoList.removeChild(todoList.lastChild);
   }
}

//Aqui será necessario também identificar qual tarefa é, ou seja, ter o pinduce dela
  const atualizar = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItems(item.tarefa, item.status, indice));
  }
//Smepre que algo for mudado  no banco, a tela irá atualizar, trazendo átona a nova tarefa.
  atualizar();
//Mesmo que haja repetição na chamada dessa função, não irá repetir, graças à função limparTarefas(), que por sua ve remove as últimas e desnecessárias tarefas
  atualizar();
 
//Vamos trabalhar agora na inserção de tarefas
const inserirItem = (evento) =>{
  //Retorna qual tecla foi prescionada dentro da input
  const tecla = evento.key;
  const texto = evento.target.value;
  //Certificando se determinada tecla (Enter), foi precionada.
  if(tecla === 'Enter'){
    const banco = getBanco();
    banco.push({'tarefa': texto, 'status': ''});
    setBanco(banco);
    //Para ver determinada mudança
    atualizar();
    //Após enviar, para limpar a caixa de texto, usa-se: 
    evento.target.value = '';
  }
}

const removerItem = (indice) =>{
  const banco = getBanco();
  //Vai pegar o banco e vai dar um splice(recorte, remoção, modificação em um array) 
  banco.splice(indice,1);
              //E remover de acordo com o incide que foi recebido, removendo então ele próprio (1)
  //Após isso:
  setBanco(banco);
  atualizar();
}

const atualizarItem = (indice) =>{
  const banco = getBanco();
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco);
  atualizar();
}

//Para saber onde se está clicando e por conseguinte, a exclusão e atualização do banco.
const clickItem = (evento) =>{
  const elemento =  evento.target;
  console.log(elemento);
  if(elemento.type === 'button'){
    //Como fazer para pegar o índice do elemento, para a identificação do mesmo:       
                                  //Esse índice é o nome que veio depois do "data-"
    const indice = elemento.dataset.indice;
    removerItem(indice);
    //Atualizar o Item
  }else if(elemento.type === 'checkbox'){
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem)

atualizar();
