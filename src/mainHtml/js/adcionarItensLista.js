// função que adiciona a div na lista de itens das notas 

// container que irá receber as divsListas 
let container = document.getElementById('containerLista')


//div que recebe a soma da lista de itens 
divQuantidade = document.getElementById('numeroItens')

index = 0
let criarNovaDiv = () => {
   
    let nomeProdutor = document.getElementById('nomeProdutor').value
    let infoComplementares = document.getElementById('infoComplementares').value
    let produto = document.getElementById('produto').value
    let ncm = document.getElementById('NCM').value
    let quantidade = document.getElementById('quantidade').value
    let valorUnitario = document.getElementById('valorUnitario').value


    if(nomeProdutor === '' || quantidade === '' || valorUnitario === ''|| produto === ''){
        audio("error")
        return
    }else{
        container.innerHTML += `
        <div id='listaItem${index}' class="listaItem">
            <button onclick="apagarDiv('listaItem${index}')" class="apagarIten"><img src="../images/trash.svg" alt=""></button>
            <img class="imgLista" src="../images/fila.svg" alt="">
            <div class="containerDescricaoitens">
                <p><strong>Produtor:${nomeProdutor}</strong></p>
                <p>Produto:${produto}</p>
                <p>Quant.:${quantidade} </p>
                <p>Valor Unit.: R$ ${valorUnitario},00</p>
                <p>Informações Complementares: ${infoComplementares}</p>
            </div>
        </div>
    </div>
    `
        index++
        contarDivs()
       

    }


}


let apagarDiv = (id) => {
    element = document.getElementById(id);
    element.remove();
    contarDivs()
}


let contarDivs = () => {

    numeroDivs = container.querySelectorAll('.listaItem')
    numeroDivsContadas = numeroDivs.length
    divQuantidade.innerHTML = numeroDivsContadas
}