//Dados iniciais
let jogo ={
    a1:'', a2:'', a3:'', // As linha e as colunas do jogo
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
};
let jogador = ''; //Qual jogador 'x' ou 'o'
let mensagem = ''; //mensagem para informar as informaçoes do jogo
let estaFuncionando = false; //Jogo esta rolando ou não





//Eventos
document.querySelector('.reset').addEventListener('click', reset); //Criar a função que reseta as informaçoes do jogo atraves de um botão
document.querySelectorAll('.item').forEach(item => {  //uma funcão for each para percorrer cada posição do jogo 
    item.addEventListener('click', itemClick); //Adiciona uma função de click em cada item do objeto do array
});




//Funçoes
function itemClick(event){ //Função para cricar em qualquer posição do jogo
let item = event.target.getAttribute('data-item'); //Pega o item exato que for clicado 
if(estaFuncionando && jogo[item] === ''){ //Se o jogo estiver rodando e os item estiverem vazios 
    jogo[item] = jogador //Troca a posição do item pelo jogador
        renderJogo();  //Carrega o jogo
        trocaJogador(); //Carrega o jogador
}
}

function reset(){ //Função de resetar
    mensagem = ''; //Reseta as mensagem

    let random = Math.floor(Math.random() * 2);  //Gera um numero 0 ou 1
    jogador = (random === 0) ? 'X': 'O';// Gera X ou O

    for(let i in jogo){ //Percorrer todo item do jogo
        jogo[i] = ''; //E deixam vazio
    }
    estaFuncionando= true; //O jogo esta funcionando

        renderJogo(); //Carrega o jogo
        renderInfo(); //Carrega as informaçoes
}

function renderJogo(){ //Função para carregar o jogo
    for(let i in jogo){ //Percorre o jogo e
        let item = document.querySelector(`div[data-item = ${i}]`) //Seleciona as posição e atribui o item
            item.innerHTML = jogo[i]; //Mostra a informação na tela
    }
        vencedor() //Carrega quem venceu
}

function renderInfo(){
document.querySelector('.vez').innerHTML = jogador;
document.querySelector('.resultado').innerHTML = mensagem;
}

function trocaJogador(){
    jogador = (jogador === 'X') ? 'O' : 'X';
        renderInfo();
}


function vencedor(){
   if(checkWinnerFor('X')){
        mensagem = 'o "X" venceu';
        estaFuncionando = false;
   }else if(checkWinnerFor('O')){
        mensagem = 'o "O" venceu';
        estaFuncionando = false;
    }else if(isFull()){
        mensagem = 'Deu empate';
        estaFuncionando = false;
    }
}

function checkWinnerFor(jogador){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let w in pos){
        let pArray = pos[w].split(',')
        let hasWon = pArray.every((option)=>jogo[option] === jogador);
        if(hasWon){
            return true;
        }
    }
}

function isFull(){
    for(let i in jogo){
        if(jogo[i] === ''){
            return false;
        }
    }
    return true;
}
