const express = require('express');
const cors = require('cors');
const db = require('./database'); // Importa a conexão com o banco que você já criou

const app = express();
const PORT = 3000;

// Configurações do Servidor
app.use(cors()); // Permite que o Front-end (Web e Mobile) converse com esta API
app.use(express.json()); // Ensina a API a ler os dados em formato JSON

// -----------------------------------------
// ROTAS DA API VÃO AQUI
// -----------------------------------------

// Rota 1: Apenas para testar se a API está viva
app.get('/', (req, res) => {
    res.send('API do Smart List está Online! 🚀');
});

// Rota para cadastrar um novo usuário (Recebe os dados do Front-end)
app.post('/cadastro', (req, res) => {
    // 1. Pegamos os dados que vieram do Front-end
    const { nome, email, password } = req.body;

    // 2. Preparamos o comando SQL para inserir na tabela (usamos a coluna 'senha')
    const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;

    // 3. Executamos no banco de dados substituindo as '?' pelos valores
    db.run(sql, [nome, email, password], function(err) {
        if (err) {
            // Se o SQLite reclamar que o e-mail já existe (regra UNIQUE que criamos)
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
            }
            console.error(err);
            return res.status(500).json({ erro: 'Erro interno no banco de dados.' });
        }

        // Se deu tudo certo, devolvemos uma resposta de sucesso
        res.status(201).json({ 
            sucesso: true, 
            mensagem: 'Cadastro realizado com sucesso!',
            usuario_id: this.lastID // Retorna o ID gerado para este usuário
        });
    });
});



// -----------------------------------------
// Ligar o Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});