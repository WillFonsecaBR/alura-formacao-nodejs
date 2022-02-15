const res = require('express/lib/response')
const atendimentos = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    atendimentos.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    atendimentos.buscaPorId(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    // CAPITA OS DADOS VINDOS DO POSTMAN
    const atendimento = req.body

    console.log(atendimento)

    // CHAMA A FUNÇÃO DENTRO DO ATENDIMENTO (MODULES) E FAZ A INSERSÃO NO BANCO
    atendimentos.adiciona(atendimento, res)
    res.send('POST ATENDIMENTO')
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body
    atendimentos.altera(id, valores, res)
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    atendimentos.deleta(id, res)
  })
}



