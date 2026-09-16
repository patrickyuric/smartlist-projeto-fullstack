//database
const sqlite3 = require('sqlite3').verbose();

// Conecta ou cria o arquivo do banco de dados na própria pasta
const db = new sqlite3.Database('./dbsmartlist.sqlite', (err)  => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados SQLite estabelecida.');
    
    // Ativa o uso de chaves estrangeiras no SQLite
    db.run('PRAGMA foreign_keys = ON;');

    // Cria as tabelas
    criarTabelas()
    }
});

function criarTabelas() {
    //Tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Tabela de Listas
    db.run(`CREATE TABLE IF NOT EXISTS listas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )`);

    // Tabela de Produtos
    db.run(`CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lista_id INTEGER NOT NULL,
        nome_produto TEXT NOT NULL,
        quantidade INTEGER DEFAULT 1,
        comprado BOOLEAN DEFAULT 0,
        FOREIGN KEY (lista_id) REFERENCES listas (id)
    )`);

    // Tabela de Logs
    db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo_acao TEXT NOT NULL,
        descricao TEXT NOT NULL,
        usuario_id INTEGER,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

module.exports = db;

