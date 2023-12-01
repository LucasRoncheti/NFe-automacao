const puppeteer = require('puppeteer');

//variaveis com as senha e login do usuário 
let login = "10032209754";
let senha = '@Denivaldo0';


//dados da empresa 

const razaoSocial = 'REINHOLZ GINGER COMERCIO DE RAIZES LTDA';
const cnpj = '50688819000161';
const inscricaoEstadual = '084083271';
const cep = '29260000';
const tipo = 'area';
const logradouro = 'AE ZONA RURAL';
const numero = '00';
const bairro = 'GALO';
const complemento = 'GALPÃO SÍTIO REINHOLZ';
const email = 'reinholzginger@hotmail.com';


// seletor botão avançar 
botaoAvancar = '#btn-avancar';

(async () => {
    // Inicialize o navegador
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // Navegue até o site do Sefaz
        await page.goto('https://app.sefaz.es.gov.br/NFAe/');

        //define o seletor 
        produtorRuralSeletor = '[name="ProdutorRural"]';

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


        //seleciona e digita o cpf no campo 
        await page.waitForSelector('#div-campo-identificador');
        console.log("Digitando login...");
        await page.type('#cpf', login);
        await page.click('#btncpf');


        //espera o campo de senha estar disponível para ser preenchido
        const elementSelector = '#div-campo-senha';
        await page.waitForSelector(elementSelector, { visible: true });

        //preenche o canmpo de senha e da um enter para logar 
        console.log("Digitando senha ...");
        await page.type('#senha', senha);
        await page.keyboard.press('Enter');

        console.log("logando...");

        await page.waitForSelector('.front');
        console.log("Logado com sucesso!");
        // encaminha para a página de nova venda 
        await page.goto('https://app.sefaz.es.gov.br/NFAe/paginas/remetente/emissao.aspx?dGlwbz1WZW5kYSZjb250PTQ');

        console.log("Criando nova venda ...");

        // seleciona o endereço da propriedade do produtor rural 
        await page.waitForSelector(".chkbx-propriedade");
        console.log("Selecionando propriedade ...");
        await page.click('.chkbx-propriedade');

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log("Avançando...");

        //aguarda a página ficar totamente visivel 
        await page.waitForSelector('#form-passo-2', { visible: true });


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
        await page.select('#DesTipoLogradouro','Area');

        //preenche o numero 
        await page.type('#DesNumero',numero);
        //preenche o bairro 
        await page.type('#DesBairro',bairro);
        //preenche o bairro 
        await page.type('#DesComplemento',complemento);
        //preenche o email 
        await page.type('#DesEmail',email);
        
        

        console.log('Dados preenchidos !');

          //avança para a próxima etapa 
          await page.click(botaoAvancar);
          console.log('Avançando...')

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // await browser.close();
    }

})();