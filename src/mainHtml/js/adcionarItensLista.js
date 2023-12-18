// função que adiciona a div na lista de itens das notas 
// e criar um array para mandar os dados para o backEnd (node.js e puppeterr) para emitir as notas 

// container que irá receber as divsListas 
let container = document.getElementById('containerLista')

//aray que guarda os dados que serão preenchidos nas notas 
var dadosNotas = []

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
    let login = document.getElementById('loginProdutor').value
    let senha = document.getElementById('senhaProdutor').value

   

    // verifica se tem algum campo sem ser preenchido 
    if (nomeProdutor === '' || quantidade === '' || valorUnitario === '' || produto === '') {
        audio("error")
        return
    } else {

        //------------------------------------------------
        infoNotas(index, nomeProdutor,infoComplementares, produto,ncm,quantidade,valorUnitario,login,senha)
        //------------------------------------------------

        container.innerHTML += `
        <div id='listaItem${index}' class="listaItem">
            <button onclick="apagarDiv('listaItem${index}',${index})" class="apagarIten">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.9207 2.66819C10.8382 2.38701 10.7832 2.2308 10.7832 2.2308C10.6938 1.94025 10.4669 1.94025 10.13 1.89026L8.30454 1.68094C8.07764 1.64658 8.07764 1.64658 7.98826 1.4685C7.68916 0.856157 7.59634 0.5 7.26975 0.5H3.72877C3.40217 0.5 3.31279 0.856157 3.0137 1.47162C2.92431 1.64658 2.92431 1.64658 2.69742 1.68407L0.868483 1.89339C0.535012 1.94337 0.294363 1.97149 0.204979 2.26204C0.204979 2.26204 0.163725 2.39013 0.0777789 2.66819C-0.0322321 3.03996 -0.0769241 2.99935 0.301239 2.99935H10.6973C11.0754 3.00247 11.0342 3.03996 10.9207 2.66819ZM9.74156 3.99909H1.25696C0.686277 3.99909 0.658774 4.06782 0.693153 4.45834L1.33603 12.0376C1.39103 12.4219 1.43229 12.5 1.93765 12.5H9.06086C9.56623 12.5 9.60748 12.4219 9.66249 12.0376L10.3054 4.45834C10.3397 4.0647 10.3122 3.99909 9.74156 3.99909Z" fill="white"/>
            </svg>
            </button>
            <svg style="margin:auto" width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.94513 30.8621H23.5917C23.9795 30.8618 24.3513 30.7125 24.6255 30.4468C24.8998 30.1812 25.054 29.821 25.0544 29.4453V1.5547C25.054 1.17907 24.8998 0.818919 24.6257 0.553303C24.3515 0.287688 23.9798 0.138305 23.592 0.137939H1.94513C1.55741 0.138305 1.18568 0.287688 0.911516 0.553303C0.637355 0.818919 0.483165 1.17907 0.482788 1.5547V29.4453C0.483165 29.821 0.637355 30.1811 0.911516 30.4467C1.18568 30.7123 1.55741 30.8617 1.94513 30.8621ZM18.9916 1.17358V2.1792C18.9914 2.27643 18.9514 2.36963 18.8804 2.43835C18.8094 2.50708 18.7132 2.54572 18.6128 2.54581H6.92402C6.82365 2.54572 6.72742 2.50708 6.65642 2.43835C6.58541 2.36963 6.54544 2.27643 6.54525 2.1792V1.17358H18.9916ZM1.5514 1.5547C1.55149 1.45359 1.59302 1.35665 1.66685 1.28519C1.74067 1.21373 1.84077 1.17358 1.94513 1.17358H5.47628V2.1792C5.47675 2.55102 5.62944 2.90748 5.90086 3.17036C6.17227 3.43325 6.54023 3.58109 6.92402 3.58146H18.6128C18.9966 3.58109 19.3645 3.43325 19.636 3.17036C19.9074 2.90748 20.0601 2.55102 20.0605 2.1792V1.17358H23.5917C23.696 1.17368 23.796 1.21386 23.8697 1.28531C23.9435 1.35677 23.985 1.45365 23.9851 1.5547V29.4453C23.985 29.5464 23.9435 29.6433 23.8697 29.7147C23.796 29.7862 23.696 29.8263 23.5917 29.8264H1.94513C1.84077 29.8264 1.74067 29.7863 1.66685 29.7148C1.59302 29.6434 1.55149 29.5464 1.5514 29.4453V1.5547Z" fill="white"/>
                <path d="M15.605 19.9171L12.2731 23.8588L9.87219 21.8006C9.76597 21.7096 9.62678 21.6632 9.48525 21.6716C9.34372 21.68 9.21143 21.7426 9.1175 21.8455C9.02356 21.9484 8.97567 22.0832 8.98436 22.2204C8.99304 22.3575 9.0576 22.4856 9.16382 22.5766L11.9805 24.9907C12.0782 25.0745 12.2042 25.1208 12.3347 25.1209C12.349 25.1209 12.3632 25.1202 12.3775 25.1191C12.4491 25.1135 12.5189 25.0939 12.5825 25.0616C12.6462 25.0293 12.7025 24.9849 12.7481 24.931L16.4324 20.5737C16.5223 20.4674 16.5649 20.3309 16.5509 20.1941C16.5368 20.0574 16.4673 19.9317 16.3576 19.8446C16.2479 19.7575 16.107 19.7163 15.9658 19.7299C15.8247 19.7435 15.6949 19.8108 15.605 19.9171ZM6.23236 8.00891H15.5584C15.7001 8.00891 15.8361 7.95436 15.9363 7.85725C16.0365 7.76013 16.0929 7.62842 16.0929 7.49109C16.0929 7.35375 16.0365 7.22204 15.9363 7.12493C15.8361 7.02782 15.7001 6.97327 15.5584 6.97327H6.23236C6.09061 6.97327 5.95466 7.02782 5.85442 7.12493C5.75419 7.22204 5.69788 7.35375 5.69788 7.49109C5.69788 7.62842 5.75419 7.76013 5.85442 7.85725C5.95466 7.95436 6.09061 8.00891 6.23236 8.00891ZM6.23236 10.6722H19.3044C19.4461 10.6722 19.5821 10.6177 19.6823 10.5206C19.7826 10.4235 19.8389 10.2918 19.8389 10.1544C19.8389 10.0171 19.7826 9.88538 19.6823 9.78827C19.5821 9.69116 19.4461 9.6366 19.3044 9.6366H6.23236C6.09061 9.6366 5.95466 9.69116 5.85442 9.78827C5.75419 9.88538 5.69788 10.0171 5.69788 10.1544C5.69788 10.2918 5.75419 10.4235 5.85442 10.5206C5.95466 10.6177 6.09061 10.6722 6.23236 10.6722ZM6.23236 13.3352H19.3044C19.4461 13.3352 19.5821 13.2807 19.6823 13.1836C19.7826 13.0865 19.8389 12.9547 19.8389 12.8174C19.8389 12.6801 19.7826 12.5484 19.6823 12.4513C19.5821 12.3541 19.4461 12.2996 19.3044 12.2996H6.23236C6.09061 12.2996 5.95466 12.3541 5.85442 12.4513C5.75419 12.5484 5.69788 12.6801 5.69788 12.8174C5.69788 12.9547 5.75419 13.0865 5.85442 13.1836C5.95466 13.2807 6.09061 13.3352 6.23236 13.3352Z" fill="white"/>
            </svg>
            
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
        console.log(dadosNotas)


    }


}

let apagarDiv = (id,index) => {
    element = document.getElementById(id);
    element.remove();
    contarDivs()

    valorParaRemover = index

    var indexParaRemover = dadosNotas.findIndex(function(objeto){
        return objeto.index === valorParaRemover
    })

    if(indexParaRemover !== -1){
        
    dadosNotas.splice(indexParaRemover,1)
    }


    console.log(dadosNotas)


}

// faz a contagem das divs e joga o valor no display vermelho  

let contarDivs = () => {

    numeroDivs = container.querySelectorAll('.listaItem')
    numeroDivsContadas = numeroDivs.length
    divQuantidade.innerHTML = numeroDivsContadas
}


// Interagindo com os dados em arrrays 
let infoNotas = (index, nomeProdutor,infoComplementares, produto,ncm,quantidade,valorUnitario,login,senha) => {

    let objeto = {
        index,
        nomeProdutor,
        infoComplementares,
        produto,
        ncm,
        quantidade,
        valorUnitario,
        login,
        senha
    }

    dadosNotas.push(objeto)
    console.log(dadosNotas)
}

