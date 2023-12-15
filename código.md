
        // Obtém o caminho absoluto do diretório do script
        const scriptDir = path.resolve(__dirname);

        // Constrói o caminho para o arquivo HTML local
        const filePath = `file://${scriptDir}/src/olaRobo/paginaRobo.html`;

        // Carrega a página local
        await page1.goto(filePath);


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

        condicional = 3
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
        condicional = 4
        //adicionando frete 
        await page.waitForSelector('#form-passo-4', { visible: true });
        await page.waitForSelector('#responsabilidade', { visible: true });

        // selecionando tipo de fret
        await page.select('#responsabilidade', 'SemFrete');

        console.log('frete selecionado');

        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...');
        condicional = 5
        //Confirmando ...
        await page.waitForSelector('#form-passo-5', { visible: true });
        await page.waitForSelector('#remNome', { visible: true });
        console.log('Confirmando dados ...');


        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        condicional = 6
        //Confirmando ...
        await page.waitForSelector('#form-passo-6', { visible: true });
        await page.waitForSelector('#nDua', { visible: true });


        //avança para a próxima etapa 
        await page.click(botaoAvancar);
        console.log('Avançando...');
        condicional = 7

        //Autorização  ...
        await page.waitForSelector('#form-passo-7', { visible: true });
        await page.waitForSelector('#step-7', { visible: true });
        console.log('Preenchendo autorização...');

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



        const fs = require('fs');
        const fsx = require('fs-extra');

        const origemMove = 'C:/Users/Lucas Roncheti/Downloads/danfe.pdf';
        const destinoMove = 'C:/Users/Lucas Roncheti/Downloads/NotasFiscais/danfe.pdf';



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
                    const diretorioDownloads = 'C:/Users/Lucas Roncheti/Downloads/NotasFiscais';
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
                        console.log('Arquivo renomeado com sucesso.');
                        console.log('Nota Salva em sua pasta de Downloads =)');
                    } else {
                        console.log('O arquivo não foi encontrado dentro do tempo máximo de espera.');
                    }

                    clearInterval(intervalId);
                } catch (error) {
                    console.error('Erro ao mover o arquivo:', error);
                }
            } else {
                console.log('Aguardando o arquivo na pasta de downloads...');
            }
        }, intervalo);