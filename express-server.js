// express-server.js

const express = require('express');
const path = require('path');

const  bodyParser =  require ('body-parser');
const  mysql=   require ('mysql2');
const  cors =  require ('cors');


const app = express();
// lógica que faz a rota para os assets da no electtron (arquivos css e imagens )
app.use('/static', express.static(path.join(__dirname, 'src')));

const PORT = 3100;

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});





// inseerção ao banco de dados 
// lógica para banco de dados da aplicação
const app2 = express();
app2.use(cors())
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}));
const PORT1 = 3200;

app2.listen(PORT1, () => {
    console.log(`Servidor Express rodando na porta ${PORT1}`);
  });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'automacao_nfe_tatiana'
});

connection.connect((err=>{
  if(err){
    console.log("erro ao entrar no banco de dados");
    return;
  }else{
    console.log('Conectado com sucesso ao banco de dados Mysql');
  }
}))


// criar rota para receber os dados do banco de dados 
app2.post('/salvar', (req, res) => {
    // Recebe os dados do formulário
    const dadosFormulario = req.body;
  
    // Consulta SQL
    const sql = 'INSERT INTO produtores_rural (numero, nome, login, senha) VALUES (?,?,?,?)';
  
    // Parâmetros
    const values = [
      dadosFormulario.numero,
      dadosFormulario.nome,
      dadosFormulario.login,
      dadosFormulario.senha
    ];
  
    // Executa a consulta
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os valores:', err);
        res.status(500).json({ mensagem: 'Erro ao salvar dados' });
        // Retorna aqui para evitar a segunda chamada para res.json()
        return;
      }
  
      console.log('Dados inseridos com sucesso');
      res.json({ mensagem: 'Dados salvos com sucesso' });
    });
  });

// listar os produtores 

app2.get('/listar',(req, res) =>{
  const sql = 'SELECT * FROM produtores_rural'
  connection.query(sql,(err, results) => {
    if (err){
      console.error('Erro ao listar os dados:', err);
      res.status(500).json({ mensagem: 'Erro ao listar dados' });
      // Retorna aqui para evitar a segunda chamada para res.json()
      return;
    }

    res.json(results)
  })
})  


app2.post('/apagar', (req, res) => {

  // recebe o numero do id do produtor 
  const idProdutor = req.body;

  //consulta sql 
  const sql = 'DELETE FROM produtores_rural WHERE id =?'

  // dados para consulta 
  const id = [
    idProdutor.id
  ]

  //executa  a consulta 

   connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao apagar os dados ')
      res.status(500).json({ mensagem: 'Erro ao a pagar os dados ' })
      return;
    }

    res.json({ mensagem: 'Dados apagados com sucesso' })
  })

})





