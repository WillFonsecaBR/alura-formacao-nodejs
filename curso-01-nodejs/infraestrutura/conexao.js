const mysql = require('mysql2')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'willian',
  database: 'db_formacao_nodejs',
})

module.exports = conexao

