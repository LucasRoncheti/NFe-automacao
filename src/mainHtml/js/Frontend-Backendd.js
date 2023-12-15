

//variavel que controla o interval para enviar o ping para o servidor 
var condicao = true

//variavel que controla o recebimento das respostas do servidor 
var chamouFuncao = 10;

// isola o primeiro objeto do array e innicia o processo de emitir notas com os dados desse objeto 
var dadosIsolados = []




let isolarDados = () => {
    if (dadosIsolados.length !== 0) {
        alert('Resete a  aplicação Ctrl + R')
        console.log("resete a aplicação")
        return;
    } else {
        var objetoSeparado = dadosNotas.shift();
        dadosIsolados.push(objetoSeparado);
        console.log(dadosIsolados);
    }


    indiceObjeto = dadosIsolados[0]
    indice = indiceObjeto.index

    idDiv = 'listaItem' + indice

    console.log(idDiv)

    var itemNaFila = document.getElementById(idDiv)
    itemNaFila.style.backgroundColor = 'orange'

    itemNaFila.classList.add('opacidade')

    setTimeout(() => {
        itemNaFila.remove()
        contarDivs()
    }, 3000)
}



//inicia o processo de emitir notas 
let iniciarProcesso = () => {
   if(dadosNotas.length <= 0) {
    FilaDeEmissao()
   }else{
    condicao = false

    isolarDados();
    enviarDados()

   }
 

}

let iniciarNovoProcesso = () => {
    FilaDeEmissao()
}


// envia os dados para o node pelo server porta 3000
function enviarDados() {
 
    if (numeroItens === '0') { 
 
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
                console.log(message);
                dadosIsolados = []
                console.log(dadosIsolados);
                // limpa o array com os dados 
            });

    })
}


// logica para receber as respostas de progresso da emissao das notas 




let setaProgresso = document.getElementById('setaProgresso')
let Login = document.getElementById('progressoLogin')
let Remetente = document.getElementById('progressoRementente')
let Produtos = document.getElementById('progressoProdutos')
let Frete = document.getElementById('progressoFrete')
let Confirmacao = document.getElementById('progressoConfirmacao')
let Dua = document.getElementById('progressoDua')
let Autorizacao = document.getElementById('progressoAutorizacao')
let textoProgresso = document.getElementById('mensagemProgresso')

let span = document.createElement('spanMensagem')




let funcaoBarraProgresso = (indiceResposta) => {


    textoProgresso.innerHTML = 'Status Atual: ' + indiceResposta
    textoProgresso.style.color = "black"
    switch (indiceResposta) {
        case "Destinatario":
            Remetente.classList.add('verde')
            setaProgresso.style.left = '180px'

            break;

        case "Produto":
            Produtos.classList.add('verde');
            setaProgresso.style.left = '280px'

            break;

        case "Frete":
            Frete.classList.add('verde');
            setaProgresso.style.left = '380px'
            console.log(indiceResposta + "front")
            break;

        case "Confirmando":
            Confirmacao.classList.add('verde')
            setaProgresso.style.left = '480px'

            break;

        case "Dua":
            Dua.classList.add('verde');
            setaProgresso.style.left = '580px'

            break;

        case "Autorizacao":
            Autorizacao.classList.add('verde')
            setaProgresso.style.left = '680px'

            break;

        case "Sucesso--":
            textoProgresso.style.color = "#04C65D"
            var segundos = 1;
            //mostra mensagem para começar o novo processo de emissão
            function esperar3Segundos() {
                if (segundos === 1) {
                    textoProgresso.innerHTML = '<strong>Status Atual: ' + indiceResposta + '</strong> <br> Preparando novo Processo em 3 segundos';
                    Autorizacao.classList.remove('verde');
                    Dua.classList.remove('verde');
                    setaProgresso.style.left = '80px';
                    segundos++;
                } else if (segundos === 2) {
                    textoProgresso.innerHTML = '<strong>Status Atual: ' + indiceResposta + '</strong> <br> Preparando novo Processo em 2 segundos';
                    Confirmacao.classList.remove('verde');
                    Frete.classList.remove('verde');
                    segundos++;
                } else if (segundos === 3) {
                    textoProgresso.innerHTML = '<strong>Status Atual: ' + indiceResposta + '</strong> <br> Preparando novo Processo em 1 segundo';
                    Produtos.classList.remove('verde');
                    Remetente.classList.remove('verde');
                    segundos++;
                } else {
                    clearInterval(intervalId);
                    condicao = true;
                    segundos = 1;
                    // Exiba sua mensagem final aqui
                    textoProgresso.innerHTML = 'Iniciando...';
                    diminuirChamarFuncao(chamouFuncao);

                        
                        if(dadosNotas.length === 0){
                            FilaDeEmissao()
                            console.log('filadeemissao()')
                            return
                        }else{
                            console.log('entrou no set ()')
                        setTimeout(()=>{
                            iniciarProcesso()
                            chamouFuncao = 10
                        },6000)

                }
               
            }

            
        }
        var intervalId = setInterval(esperar3Segundos, 1000);

            break;

        case "error":

            textoProgresso.innerHTML = '<strong>Status Atual: ' + indiceResposta + '</strong>'
            textoProgresso.style.color = "#E42B02"

            break;
    }
}


const eventSource = new EventSource('/pingServidor');


validarFuncao2 = false;

eventSource.onmessage = function (event) {

    if ((event.data !== 'Sucesso' && event.data !== 'Sucesso--') && chamouFuncao === 10) {
        funcaoBarraProgresso(event.data);
        console.log("servidor 1" + event.data);
        
    }
    
    // if ((event.data === 'Confirmando')){
    //     validarFuncao2 =true;
    //     console.log(validarFuncao2);
    // }

    if ((event.data === 'Entrando no site...')){
        validarFuncao2 =true;
        console.log(validarFuncao2);
    }

    if ((event.data === 'Sucesso--') && validarFuncao2) {
        validarFuncao2 = false;
        chamouFuncao = 16
        console.log("servidor 2" + event.data);
        funcaoBarraProgresso(event.data);
    }

    // Resposta do servidor
    // Atualize seu DOM ou execute outras ações com a resposta
};

function diminuirChamarFuncao(chamouFuncao) {
    // Configura um intervalo para diminuir o número a cada segundo
    const intervalIdChamarFuncao = setInterval(function () {
        if (chamouFuncao > 10) {
            chamouFuncao--;
            console.log(chamouFuncao); // Exibe o número a cada segundo
        } else {
            clearInterval(intervalIdChamarFuncao); // Para o intervalo quando atingir ou ultrapassar 6
        }
    }, 1000);
}



