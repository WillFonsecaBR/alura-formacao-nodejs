const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimentos{
  // ADICIONANDO NO BANCO DE DADOS
  adiciona(atendimento, res) {
    // VARIAVEIS DE TEMPO
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

    // VALIDAÇÕES DE CAMPOS
    const validaData = moment(data).isSameOrAfter(dataCriacao)
    const validaCliente = atendimento.cliente.length >= 5

    const validacoes = [
      // CONSTRUINDO MENSAGENS DE ERRO
      {
        nome: 'data',
        valido: validaData,
        mensagem: "A data deve ser maior ou igual a data atual"
      },
      {
        nome: 'Cliente',
        valido: validaCliente,
        mensagem: "O campo cliente deve ter no minimo cinco caracteres"
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
          // VARIAVEL PARA FAZER O INSERT NO BANCO
    const sql = 'INSERT INTO Atendimentos SET ?'
    const atendimentoDatado = {...atendimento, dataCriacao, data}

    // CONECTA E PASSA OS PARAMETROS PARA O BANCO DE DADOS
    conexao.query(sql, atendimentoDatado, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)       
      }
      else {
        res.status(201).json(atendimento)
      }
    })
    }
  }

  // LISTANDO DO BANCO DE DADOS
  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultado)
      }
    })
  }

  altera(id, valores, res) {
    // FORMATANDO A DATA
    if (valores.data) {
      valores.data =moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }
    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
    conexao.query(sql, [valores, id], (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultado)
      }
    })
  };

  deleta(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({id})
      }
    })
    
  }
}

module.exports = new Atendimentos