

let audio = (condicao) => {


    var secesso01 = new Audio('../audio/sucesso01.mp3')
    var secesso02 = new Audio('../audio/sucesso02.mp3')
    var error = new Audio('../audio/error.mp3')


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
