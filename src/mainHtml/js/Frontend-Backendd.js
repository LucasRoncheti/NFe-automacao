

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
    if (dadosNotas.length <= 0) {
        FilaDeEmissao()
    } else {
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

        let loginProd = x.login;
        let senhaProd = x.senha;

        let NomeProdutorCaixaDialogo = document.getElementById('NomeProdutorCaixaDialogo')
        NomeProdutorCaixaDialogo.innerHTML = nomeProdutor

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
                loginProd,
                senhaProd
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


                    if (dadosNotas.length === 0) {
                        FilaDeEmissao()
                        console.log('filadeemissao()')
                        return
                    } else {
                        console.log('entrou no set ()')
                        setTimeout(() => {
                            iniciarProcesso()
                            chamouFuncao = 10
                        }, 6000)

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





validarFuncao2 = false;
// recebe as atualizações de progresso do servidor 
const eventSource = new EventSource('/pingServidor');
eventSource.onmessage = function (event) {

    if ((event.data !== 'Sucesso' && event.data !== 'Sucesso--') && chamouFuncao === 10) {
        funcaoBarraProgresso(event.data);
        console.log("servidor 1" + event.data);

    }

    if ((event.data === 'Entrando no site...')) {
        validarFuncao2 = true;
        console.log(validarFuncao2);
    }

    if ((event.data === 'Sucesso--') && validarFuncao2) {
        validarFuncao2 = false;
        chamouFuncao = 16
        console.log("servidor 2" + event.data);
        funcaoBarraProgresso(event.data);
    }


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


// salvar os valores do formulário no banco de dados 
var form =  document.getElementById('formCadastroProdutor')
  // selecionar inputs 
 

let cadastroProdutores = () => {
    
      
    let numero = document.getElementById("numero").value;
    let nome = document.getElementById("nome").value;
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;
        fetch('http://localhost:3200/salvar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ numero, nome, login, senha })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            form.reset();
        })
        .catch(error => console.error(error));

}

let divLista = document.getElementById("lista")

condicionalListar = false




let apagarProdutor = (idP) => {
    let id = idP;
    fetch('http://localhost:3200/apagar', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ id })
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        window.location.reload();
      })
      .catch(error => console.error('Erro:', error));
  };
  



let listar = () => {


    if(!condicionalListar){
        fetch('http://localhost:3200/listar')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Certifique-se de que 'array' contém a propriedade que você deseja iterar
            data.forEach(element => {
                 console.log(element);
                 objetosData = data.length
                 divLista.innerHTML += `
                    <div id='card' onclick="preencherDados('${element.nome}','${element.login}','${element.senha}')" class="card">
                        <div class="card-body">
                            <p style="width:5%;" id="${element.id}"   value="${element.id}"># ${element.id}</p>
                            <input id="${element.login}" type="hidden"  value="${element.login}"/>
                            <input id="${element.senha}"id="" type="hidden" value="${element.senha}"/>
                            <p class="card-title"><strong>Numero:</strong>${element.numero}</p> 
                            <p class="card-text"><strong>Nome:</strong>${element.nome}</p>

                            <button  style="width:17px;height:95%;background-color:#E42B02;border:none;" onclick="apagarProdutor('${element.id}')" >
                            <svg style="fill:#0000FF" width="11" height="13" viewBox="0 0 11 13"  xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9207 2.66819C10.8382 2.38701 10.7832 2.2308 10.7832 2.2308C10.6938 1.94025 10.4669 1.94025 10.13 1.89026L8.30454 1.68094C8.07764 1.64658 8.07764 1.64658 7.98826 1.4685C7.68916 0.856157 7.59634 0.5 7.26975 0.5H3.72877C3.40217 0.5 3.31279 0.856157 3.0137 1.47162C2.92431 1.64658 2.92431 1.64658 2.69742 1.68407L0.868483 1.89339C0.535012 1.94337 0.294363 1.97149 0.204979 2.26204C0.204979 2.26204 0.163725 2.39013 0.0777789 2.66819C-0.0322321 3.03996 -0.0769241 2.99935 0.301239 2.99935H10.6973C11.0754 3.00247 11.0342 3.03996 10.9207 2.66819ZM9.74156 3.99909H1.25696C0.686277 3.99909 0.658774 4.06782 0.693153 4.45834L1.33603 12.0376C1.39103 12.4219 1.43229 12.5 1.93765 12.5H9.06086C9.56623 12.5 9.60748 12.4219 9.66249 12.0376L10.3054 4.45834C10.3397 4.0647 10.3122 3.99909 9.74156 3.99909Z" fill="white"/>
                            </svg>
                            </button>

                        </div>
                    </div>
                 `
            });
        })
        .catch(error => console.error('Erro:', error));
        condicionalListar = true
    }

   
};

// preenche os dados de login e senha nos inputs (hidden) para enviar para o servidor 
let preencherDados = (name,login,senha) => {

    let produtorName = document.getElementById('nomeProdutor');
    let produtorLogin = document.getElementById('senhaProdutor');
    let produtorSenha = document.getElementById('loginProdutor');

    produtorName.value = name;
    produtorLogin.value = login;
    produtorSenha.value = senha;
    divLista.innerHTML = ""
    condicionalListar = false

}   


// função que verifica se há click fora da lista de  produtores 
// se  o click ocorrer foda da da lista de produtores a lista é escondida 
document.addEventListener('click', function (event) {
    const listaDeProdutores = document.getElementById('card');

    if (listaDeProdutores && !listaDeProdutores.contains(event.target)) {
       
      
        divLista.innerHTML = ""
        condicionalListar = false
    }
});