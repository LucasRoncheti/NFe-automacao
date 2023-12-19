import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import fsx from 'fs-extra';
import express from 'express';
import bodyParser from 'body-parser'


//logica para para receber os dados do html 

import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Adicione o middleware express.json() para analisar o corpo da solicitação como JSON
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './src/mainHtml/main.html'));
});




// gera as respostar do back para o front com o pregresso da nota 

var respostaServidorVar = "";


// manda ping com o real progresso da emissão da nota
app.get('/pingServidor', (req, res) => {
    // Configuração de cabeçalhos para SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Envio de dados para o cliente a cada 1 segundo (exemplo)
    const intervalId = setInterval(() => {

        if (respostaServidorVar === "") {

        } else {
            res.write(`data: ${respostaServidorVar}\n\n`);
        }

        if (respostaServidorVar === "error") {
            res.write(`data: ${respostaServidorVar}\n\n`)
            setTimeout(() =>{
                res.end();
            },1000)
          

            respostaServidorVar = ""

        }

    

        // if (respostaServidorVar === "Sucesso--") {
        //     clearInterval(intervalId);
        //     res.end();

        //     respostaServidorVar = ""

        // }

     


    },10);

    // // Encerrar a conexão após 10 segundos (exemplo)
    // setTimeout(() => {
    //   clearInterval(intervalId);
    //   res.end();
    // }, 10000);
});

//--------------------------------------


app.post('/enviar-dados', (req, res) => {
    // Certifique-se de que req.body está definido antes de tentar desestruturar
    if (!req.body) {
        res.status(400).send('Corpo da solicitação ausente ou inválido.');
        return;
    }

    const { indice, nomeProdutor, infoComplementares, produto, ncm, quantidade, valorUnitario,loginProd,senhaProd} = req.body;

    // Lógica para processar os dados e enviar uma resposta

     gerarNotas(indice, nomeProdutor, infoComplementares, produto, ncm, quantidade, valorUnitario,loginProd,senhaProd);

 
    res.send(senhaProd,loginProd);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



//dados da empresa 
const razaoSocial = 'REINHOLZ GINGER COMERCIO DE RAIZES LTDA';
const cnpj = '50688819000161';
const inscricaoEstadual = '084083271';
const cep = '29260000';
const tipo = 'Area';
const logradouro = 'AE ZONA RURAL';
const numero = '00';
const bairro = 'GALO';
const complemento = 'GALPÃO SÍTIO REINHOLZ';
const email = 'reinholzginger@hotmail.com';



// seletor botão avançar 
let botaoAvancar = '#btn-avancar';

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

async function gerarNotas(indice, nomeProdutor, infoComplementares, produto, ncm, quantidade, valorUnitario,loginProd,senhaProd) {

    //variaveis com as senha e login do usuário 
    // let login = loginProd;
    // let senha = senhaProd;
    // InicializsenhaProd
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,

    });
    const page = await browser.newPage();
    //  const page1 = await browser.newPage();


    await page.setDefaultTimeout(60000);




    try {

        respostaServidorVar = "Entrando no site...";

        // Navegue até o site do Sefaz
        await page.goto("https://app.sefaz.es.gov.br/NFAe/");
        //'https://app.sefaz.es.gov.br/NFAe/'
        //https://www.google.com

        // abre outra aba no navegador

        // Obtém o caminho absoluto do diretório do script
        //const scriptDir = path.resolve(__dirname);

        // Constrói o caminho para o arquivo HTML local
        //const filePath = `file://${scriptDir}/src/olaRobo/paginaRobo.html`;

        // Carrega a página local
        // await page1.goto(filePath);

        respostaServidorVar = "Iniciando Login..";
        //define o seletor 
        let produtorRuralSeletor = '[name="ProdutorRural"]';

       
        // espera o seletor aparecer na página 
        await page.waitForSelector(produtorRuralSeletor);
        
        // checa se o elemento foi encontrado
        const produtorRuralButton = await page.$(produtorRuralSeletor);

        if (!produtorRuralButton) {
            console.log("Opção não encontrada [Produtor Rural]");
            return;
        } else {
            //clica no botão do produtor rural 
            await page.click(produtorRuralSeletor);
            console.log("Clicando produtor rural");
        }
        respostaServidorVar = "Login...";
        //seleciona e digita o cpf no campo 
        await page.waitForSelector('#div-campo-identificador');
        console.log("Digitando login...");
        await page.type('#cpf', loginProd);
        await page.click('#btncpf');
        respostaServidorVar = "Senha.."
        //espera o campo de senha estar disponível para ser preenchido
        const elementSelector = '#div-campo-senha';
        await page.waitForSelector(elementSelector, { visible: true });

        //preenche o canmpo de senha e da um enter para logar 
        console.log("Digitando senha ...");
        await page.type('#senha', senhaProd);
        await page.keyboard.press('Enter');

        respostaServidorVar = "Logando...";


        respostaServidorVar = "Logado com Sucesso!"

        await page.waitForSelector('.front');
        respostaServidorVar = "Criando nova venda ...";
        // encaminha para a página de nova venda 
        await page.goto('https://app.sefaz.es.gov.br/NFAe/paginas/remetente/emissao.aspx?dGlwbz1WZW5kYSZjb250PTQ');

        console.log("Criando nova venda ...");
        
        
        respostaServidorVar = "Selecionando propriedade ...";
        // seleciona o endereço da propriedade do produtor rural 
        await page.waitForSelector(".chkbx-propriedade");
        console.log("Selecionando propriedade ...");
        await page.click('.chkbx-propriedade');

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log("Avançando...");

        respostaServidorVar = "Destinatario"
        //aguarda a página ficar totamente visivel 
        await page.waitForSelector('#form-passo-2', { visible: true });

        respostaServidorVar = "Destinatario"
        respostaServidorVar = "Preenchendo os dados do destinatário...";

        console.log('Preenchendo dados do destinatário ...');
        // preenche a razão social do destinatário 
        await page.type('#DesNome', razaoSocial);

        //preenche o cnpj 
        await page.type("#CpfCnpj", cnpj);

        //preenche a inscrição estadual  
        await page.type("#InsEstadual", inscricaoEstadual);

        //preenche o cep  
        await page.type('#DesCep', cep);

        //clica no botão de buscar cep 
        await page.click('#BuscaCep');

        //espera carregar od dados do cep antes de prosseguir para a próxima ação 
        await page.waitForFunction(() => {
            const cidadeInput = document.getElementById('DesMunicipio');
            return cidadeInput && cidadeInput.value.trim() !== '...' || '';
        });

        //preenche logradouro 
        await page.type('#DesLogradouro', logradouro);

        //seledciona area 
        await page.waitForSelector('#DesTipoLogradouro');
        await page.select('#DesTipoLogradouro', tipo);

        //preenche o numero 
        await page.type('#DesNumero', numero);
        //preenche o bairro 
        await page.type('#DesBairro', bairro);
        //preenche o bairro 
        await page.type('#DesComplemento', complemento);
        //preenche o email 
        await page.type('#DesEmail', email);

        

        console.log('Dados preenchidos !');

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...')
        respostaServidorVar = "Preenchendo dados do produto";
        respostaServidorVar = "Produto"
        //aguarda a página de adicionar produtos ficar totamente visivel 
        await page.waitForSelector('#form-passo-3', { visible: true });
        await page.waitForSelector('#div-descricao-produto-produtor', { visible: true });

        console.log('Adicionando dados do produto...')
        await page.click("#div-descricao-produto-produtor");
        //seleciona outros produtos 


        // Seletor CSS da sua div
        const divSelector = '.dropdown-menu:nth-child(6)';

        // Rolar até o final da div
        await page.evaluate((divSelector) => {
            const div = document.querySelector(divSelector);

            if (div) {
                div.scrollTop = div.scrollHeight;
            }
        }, divSelector);

        //selecionando outros produtos 
        await page.waitForSelector('[data-original-index="40"]');
        await page.click('[data-original-index="40"]');

        await page.waitForSelector("#descricao-livre-produto", { visible: true })
        await page.type("#descricao-livre-produto", produto);
        console.log('produto adicionado');

        //seleciona a unidade 
        await page.click('.unidade');
        await page.waitForSelector('[data-original-index="2"]');

        // Texto que você deseja usar como seletor
        const textoDesejado = 'Caixa (CX)';

        // Construir a expressão XPath para selecionar a tag <a> com base no texto
        const xpathExpression = `//li//span[text()='${textoDesejado}']/ancestor::a`;

        // Selecionar a tag <a> usando $x
        const elementoA = await page.$x(xpathExpression);

        // Fazer algo com o elemento <a> (exemplo: clicar)
        await elementoA[0].click();

        console.log('unidade adicionado');

        //adiciona quantidade
        await page.type('#QuantProd', quantidade);
        console.log('quantidade adicionado');

        //valor unit 
        await page.type('#ValorUnit', valorUnitario);
        console.log('Valor adicionado');


        //adicionar ncm 
        await page.click('#lnk-ncm-produto');
        await page.waitForSelector('#Ncm');
        await page.focus('#Ncm');

        //selecionar e apagar texto do input 
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');

        await page.type('#Ncm', ncm);
        console.log('ncm adicionado');

        respostaServidorVar = "Preenchendo informações complementares...";
        //adicionar informações complementares 
        await page.click('#lnk-info-complementar-produto');
        await page.waitForSelector('#txt-info-complementar-produto');
        await page.type('#txt-info-complementar-produto', infoComplementares);
        console.log('complementares adicionado')

        await page.click('[data-id="ICMSTributacao"]');


        // Usando XPath para localizar o elemento pelo atributo data-original-index
        const xpathExpression1 = `//li//span[text()='Não tributado']/ancestor::a`;
        const elemento = await page.waitForXPath(xpathExpression1);
        await elemento.click();

        console.log('Tributação');

        //incluir
        await page.click('#btn-incluir-produto');

        console.log('Incluir Produto')
        await page.waitForSelector('.limite-desc-prod', { visible: true })

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...')
        respostaServidorVar = "Frete"
        //adicionando frete 
        await page.waitForSelector('#form-passo-4', { visible: true });
        await page.waitForSelector('#responsabilidade', { visible: true });
        respostaServidorVar = "Selecionando frete...";
        // selecionando tipo de fret
        await page.select('#responsabilidade', 'SemFrete');

        console.log('frete selecionado');

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...');

   
        respostaServidorVar = "Confirmando dados...";
        respostaServidorVar = "Confirmando"
        //Confirmando ...
        await page.waitForSelector('#form-passo-5', { visible: true });
        
        await page.waitForSelector('#remNome', { visible: true });
        console.log('Confirmando dados ...');
       

        //avança para a próxima etapa 
        await page.click(botaoAvancar);

        //Confirmando ...
        await page.waitForSelector('#form-passo-6', { visible: true });
        await page.waitForSelector('#nDua', { visible: true });

        respostaServidorVar = "Dua"
        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...');

        respostaServidorVar = "Autorizacao"
        
        //Autorização  ...
        await page.waitForSelector('#form-passo-7', { visible: true });
        await page.waitForSelector('#step-7', { visible: true });
        console.log('Preenchendo autorização...');
        respostaServidorVar = "Autorizando...";

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...');


        await page.waitForSelector('#form-passo-8', { visible: true });
        await page.waitForSelector('#step-8', { visible: true });
        await page.waitForSelector('#divSpin', { visible: false });
        console.log('Fazendo Download...');
        
        const linkSelector = '#lnk-download-danfe-passo-8';

        let href;
        while (true) {

            await page.waitForTimeout(1000);

            href = await page.$eval(linkSelector, link => link.getAttribute('href'));

            if (href !== '#') {
                await page.click(linkSelector);
                break;
            }
        }

        console.log('Nota Gerada com Sucesso !');

        respostaServidorVar = "Iniciando download";


        const origemMove = 'C:/Users/RONALDO/Downloads/danfe.pdf';
        const destinoMove = 'C:/Users/RONALDO/Downloads/NotasFiscais/danfe.pdf';



        const intervalo = 500; // em milissegundos

        // Função para verificar a existência do arquivo
        function verificarExistencia() {
            return fs.existsSync(origemMove);
        }

        // Função para mover o arquivo e retornar uma promessa
        function moverArquivo() {
            return new Promise((resolve, reject) => {
                fsx.move(origemMove, destinoMove, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Arquivo movido para a pasta NotasFiscais!');
                        resolve();
                    }
                });
            });
        }

        // Loop para verificar a existência do arquivo em intervalos regulares
        const intervalId = setInterval(async () => {
            if (verificarExistencia()) {
                try {
                    // Move o arquivo para o destino e espera pela conclusão
                    await moverArquivo();
                    // Limpa o intervalo após mover o arquivo

                    // Restante do código após o arquivo ser movido
                    console.log('Renomeando Nota...');

                    // Função para verificar se o arquivo existe
                    function verificarArquivo(caminhoArquivo) {
                        try {
                            fs.accessSync(caminhoArquivo, fs.constants.F_OK);
                            return true; // O arquivo existe
                        } catch (err) {
                            console.log('Arquivo não encontrado');
                            return false; // O arquivo não existe
                        }
                    }

                    // Diretório de downloads e nome do arquivo
                    const diretorioDownloads = 'C:/Users/RONALDO/Downloads/NotasFiscais';
                    const nomeArquivoOriginal = 'danfe.pdf';
                    const novoNome = `${diretorioDownloads}/${nomeProdutor}-${indice}.pdf`;

                    // Esperar até que o arquivo específico exista
                    let tempoEspera = 0;
                    const intervaloEspera = 500; // Intervalo de verificação em milissegundos (0,5 segundos)
                    const tempoMaximoEspera = 45000; // Tempo máximo de espera em milissegundos (45 segundos)

                    while (!verificarArquivo(`${diretorioDownloads}/${nomeArquivoOriginal}`) && tempoEspera < tempoMaximoEspera) {
                        await page.waitForTimeout(intervaloEspera);
                        tempoEspera += intervaloEspera;
                    }

                    // Verificar se o arquivo existe após a espera
                    if (verificarArquivo(`${diretorioDownloads}/${nomeArquivoOriginal}`)) {
                        // Renomear o arquivo baixado
                        fs.renameSync(`${diretorioDownloads}/${nomeArquivoOriginal}`, novoNome);
                        respostaServidorVar = "Sucesso"
                        
                        new Promise(r => setTimeout(r, 10));
                        respostaServidorVar = "Sucesso--"
                        
                        console.log('Arquivo renomeado com sucesso.');
                        console.log('Nota Salva em sua pasta de Downloads =)');
                      
                        new Promise(r => setTimeout(r, 2500));
                   
                        await browser.close();
                      
                    } else {
                        console.log('O arquivo não foi encontrado dentro do tempo máximo de espera.');
                        respostaServidorVar = "error"
                    }

                    clearInterval(intervalId);
                } catch (error) {
                    console.error('Erro ao mover o arquivo:', error);
                    respostaServidorVar = "error"
                }
            } else {
                console.log('Aguardando o arquivo na pasta de downloads...');
            }
        }, intervalo);

    } catch (error) {
        respostaServidorVar = "error"

        console.error('Erro:', error);
    } finally {

        
    }

}

export default gerarNotas;



