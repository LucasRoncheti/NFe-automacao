

//variavel que controla o interval para enviar o ping para o servidor 
var condicao = true

// isola o primeiro objeto do array e innicia o processo de emitir notas com os dados desse objeto 
var dadosIsolados = []
let isolarDados = () => {
    var objetoSeparado = dadosNotas.shift();
    dadosIsolados.push(objetoSeparado);
    console.log(dadosIsolados);

}

//inicia o processo de emitir notas 
let iniciarProcesso = () => {
    condicao = false
    isolarDados();
    enviarDados()
}


// envia os dados para o node pelo server porta 3000
function enviarDados() {
    numeroItens = document.getElementById('numeroItens').textContent;
    if (numeroItens === '0'){
        alert('LIsta de Notas Vazia')
        return
    }
    
    emitirNotas()
    const dadosParaNota = dadosIsolados.map((x) => {

        let nomeProdutor = x.nomeProdutor;
        let infoComplementares = x.infoComplementares;
        let produto = x.produto;

        let ncmToString = x.ncm.toString()
        let ncm = ncmToString;

        let quantidadeToString = x.quantidade.toString()
        let quantidade = quantidadeToString;

        let valorUnitarioToString = x.valorUnitario.toString()
        let valorUnitario = valorUnitarioToString;

        let indiceToString = x.index.toString();
        let indice = indiceToString;
       

        let NomeProdutorCaixaDialogo = document.getElementById('NomeProdutorCaixaDialogo')
        NomeProdutorCaixaDialogo.innerHTML = nomeProdutor

        const site = "https://www.google.com";

        fetch('/enviar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indice,
                nomeProdutor,
                infoComplementares,
                produto,
                ncm,
                quantidade,
                valorUnitario,
            }),
        })
            .then(response => response.text())
            .then(message => {
                console.log(message); // Exibe a mensagem recebida do servidor
            });

    })
}


// logica para receber as respostas de progresso da emissao das notas 

var indiceRespostaNumber = 1
var indiceResposta = indiceRespostaNumber.toString();

let setaProgresso = document.getElementById('setaProgresso')
let Login = document.getElementById('progressoLogin')
let Remetente = document.getElementById('progressoRementente')
let Produtos = document.getElementById('progressoProdutos')
let Frete = document.getElementById('progressoFrete')
let Confirmacao = document.getElementById('progressoConfirmacao')
let Dua = document.getElementById('progressoDua')
let Autorizacao = document.getElementById('progressoAutorizacao')

let funcaoBarraProgresso = ()=> {
    var indiceResposta = indiceRespostaNumber.toString();
    switch(indiceResposta) {
        case "2":
            Remetente.classList.toggle('verde');
            setaProgresso.style.left = '180px'
            console.log(indiceResposta)
            break;
            case "3":
            Produtos.classList.toggle('verde');
            setaProgresso.style.left = '260px'
            console.log(indiceResposta)
            break;
       
}
}

// envia uma solicitação a cada segundo para obter o status de progresso do servidor
let receberRespostaServidor = () => {
    if(condicao){
        console.log('teste setInterval')
    }else{
        var indiceResposta = indiceRespostaNumber.toString();
        console.log('enviando ping')
        fetch('/receberResposta', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ indiceResposta }),
            
        })
            .then(response => response.text())
            .then(message => {
                console.log(message)
                indiceRespostaNumber++
                funcaoBarraProgresso()
               
            });
    }
    
      
       
}

    setInterval(receberRespostaServidor,3000)