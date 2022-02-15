// IMPORTS:
const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

// CONFIGURANDO A CONEXÃO COM O BANCO:
conexao.connect(erro => {
if (erro) {
    // QUANDO DER ERRO NA CONEXÃO
    console.log("ERRO NA CONEXÃO")
    console.log(erro)
  } else {   
    console.log('Conectado com sucesso!')

    // ACESSANDO AS CONFIGURAÇÕES GLOBAIS:
    const app = customExpress()

    //INICIA A TABELA PASSANDO PARA ELA A CONEXÃO
    Tabelas.init(conexao)

    // CONFIGURANDO A PORTA DO APP:
    app.listen(3000, () => {
      console.log('servidor rodando na porta 3000')
    })
  }
})
