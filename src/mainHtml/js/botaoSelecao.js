// essas funções selecionam as divs com os campos de Produtor Rural, Fila de Emissãao e Emitir Notas 

//seleciona o botão que inicia o processo de emissao de notas 
botaoEmissao = document.getElementById('botaoEmissao')

//funcao que sao ser clicada troca as cores e  troca a div com os campos a ser preenchidos 
function FilaDeEmissao() {
    //altera o botão produtor rural
    document.getElementById("produtorRural").style.display = "none";
    document.getElementById("seletorRural").style.display = "none";

    //altera o botão fila de emissao 
    document.getElementById("filaEmissao").style.display = "flex";
    document.getElementById("seletor").style.display = "block";

    //altera botão emissor de notas 
    document.getElementById("seletorEmitirNotas").style.display = "none";
    minhaImagem = document.getElementById('imgEmitirNotas')
    minhaImagem.src = "../images/play.svg"
    minhaImagem.classList.remove('animacaoLoading')
    document.getElementById("emitirNotas").style.display = "none";

    //seleciona o botão emissor notas e remove a classe que altera a cor  se ela  estiver presente 
    if (botaoEmissao.classList.contains("botaoloading")) {
        botaoEmissao.classList.remove("botaoloading")
    }

}


//funcao que sao ser clicada troca as cores e  troca a div com os campos a ser preenchidos 

function produtorRural() {

    //altera o botão produtor rural
    document.getElementById("produtorRural").style.display = "flex";
    document.getElementById("seletorRural").style.display = "block";

    //altera o botão fila de emissao 
    document.getElementById("filaEmissao").style.display = "none";
    document.getElementById("seletor").style.display = "none";

    //altera botão emissor de notas 
    document.getElementById("seletorEmitirNotas").style.display = "none";
    minhaImagem = document.getElementById('imgEmitirNotas')
    minhaImagem.src = "../images/play.svg"
    minhaImagem.classList.remove('animacaoLoading')
    document.getElementById("emitirNotas").style.display = "none";

    //seleciona o botão emissor notas e remove a classe que altera a cor  se ela  estiver presente 

    if (botaoEmissao.classList.contains("botaoloading")) {
        botaoEmissao.classList.remove("botaoloading")
    }

}

//funcao que sao ser clicada troca as cores e  troca a div com os campos a ser preenchidos 

function emitirNotas() {
    //altera o botão produtor rural
    document.getElementById("produtorRural").style.display = "none";
    document.getElementById("seletorRural").style.display = "none";

    //altera o botão fila de emissao 
    document.getElementById("filaEmissao").style.display = "none";
    document.getElementById("seletor").style.display = "none";

    //altera botão emissor de notas 
    document.getElementById("seletorEmitirNotas").style.display = "block";
    minhaImagem = document.getElementById('imgEmitirNotas')
    minhaImagem.src = "../images/Asset 1.png"
    minhaImagem.classList.toggle('animacaoLoading')
    document.getElementById("emitirNotas").style.display = "flex";

    //seleciona o botão emissor notas e adiciona a classe que altera a cor  se ela  não estiver presente 

    if (botaoEmissao.classList.contains("botaoloading")) {
        botaoEmissao.classList.add("botaoloading")
    } else {
        botaoEmissao.classList.add("botaoloading")
    }

}



FilaDeEmissao()
// emitirNotas()
