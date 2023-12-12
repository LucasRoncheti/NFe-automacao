

let audio = (condicao) => {
    // audios que será usados nos avisos 

    var secesso01 = new Audio('http://localhost:3100/static/audio/sucesso01.mp3')
    var secesso02 = new Audio('http://localhost:3100/static/audio/sucesso02.mp3')
    var error = new Audio('http://localhost:3100/static/audio/error.mp3')


    switch(condicao){
        case "sucesso01":
            secesso01.play()
            break;
        case "sucesso02":
            secesso02.play()
            break;
        case "error":
            error.play().then(() => {
                alert('Preencha todos os campos');
              });
            break;
    }
 }
