const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();

  // Obtém o caminho absoluto do diretório do script
  const scriptDir = path.resolve(__dirname);

  // Constrói o caminho para o arquivo HTML local
  const filePath = `file://${scriptDir}/teste.html`;

  // Carrega a página local
  await page.goto(filePath);

  // Execute suas ações na página local...


})();
