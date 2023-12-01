const puppeteer = require('puppeteer');

(async () => {
    // Inicialize o navegador
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navegue até o site do Sefaz
    await page.goto('https://app.sefaz.es.gov.br/NFAe/');

    //clica no botão produtor Rural
    await page.waitForSelector('[name="ProdutorRural"]')
    await page.waitForSelector('[name="ProdutorRural"]');
    await page.click('[name="ProdutorRural"]')

    //seleciona e digita o cpf no campo 
    await page.waitForSelector('#div-campo-identificador')
    await page.type('#cpf', '10032209754')
    await page.click('#btncpf')

    //espera o campo de senha estar disponível para ser preenchido
    const elementSelector = '#div-campo-senha';
    await page.waitForSelector(elementSelector, { visible: true });

   //preenche o canmpo de senha e da um enter para logar 
    await page.type('#senha', '@Denivaldo0')
    await page.keyboard.press('Enter')
    
    console.log("logando...")


    //   await page.screenshot({ path: 'resultado.png' });

    // Feche o navegador
    //   await browser.close();
})();